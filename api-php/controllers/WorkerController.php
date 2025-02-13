<?php
class WorkerController {
    private $db;
    private $db_mk2;

    public function __construct($db, $db_mk2 = null) {
        $this->db = $db;
        $this->db_mk2 = $db_mk2;
    }

    public function getWorkers($role = 'SKK') {
        try {
            $sql = "SELECT 
                        CARDID, 
                        OPERID, 
                        FIRSTNAME, 
                        LASTNAME, 
                        TYPE, 
                        UGROUP, 
                        COMPANY, 
                        TO_CHAR(LASTUPDATE, 'DDMMRRRRHH24MISS') AS LASTUPDATE,
                        CASE 
                            WHEN LASTUPDATE IS NULL THEN 1
                            ELSE 0 
                        END as is_null_lastupdate
                    FROM CDAS.OTS_USER 
                    WHERE COMPANY = :role
                    ORDER BY is_null_lastupdate ASC, LASTUPDATE DESC NULLS LAST";
            
            $stid = oci_parse($this->db, $sql);
            oci_bind_by_name($stid, ":role", $role);
            
            if (!oci_execute($stid)) {
                $e = oci_error($stid);
                error_log("Database Error: " . $e['message']);
                return [
                    'status' => 'error',
                    'message' => 'Database error: ' . $e['message']
                ];
            }
            
            $workers = [];
            while ($row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)) {
                $workers[] = array_change_key_case($row, CASE_LOWER);
            }
            
            return [
                'status' => 'success',
                'data' => $workers
            ];
            
        } catch (Exception $e) {
            error_log("Error in getWorkers: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function addWorker($data) {
        try {
            error_log("addWorker called");
            error_log("Data received: " . print_r($data, true));

            // Validate required fields (only operid, firstname, lastname, type, and company are required)
            $required_fields = ['operid', 'firstname', 'lastname', 'type', 'company'];
            foreach ($required_fields as $field) {
                if (empty($data[$field])) {
                    error_log("Missing required field: $field");
                    return [
                        'status' => 'error',
                        'message' => "Required field missing: $field"
                    ];
                }
            }

            // Check if OPERID already exists
            $check_sql = "SELECT COUNT(*) as count FROM CDAS.OTS_USER WHERE OPERID = :operid AND COMPANY = :company";
            $check_stid = oci_parse($this->db, $check_sql);
            oci_bind_by_name($check_stid, ":operid", $data['operid']);
            oci_bind_by_name($check_stid, ":company", $data['company']);
            
            error_log("Checking if OPERID exists");
            if (!oci_execute($check_stid)) {
                $e = oci_error($check_stid);
                error_log("Database Error: " . $e['message']);
                return [
                    'status' => 'error',
                    'message' => 'Database error: ' . $e['message']
                ];
            }

            $row = oci_fetch_array($check_stid, OCI_ASSOC);
            if ($row['COUNT'] > 0) {
                error_log("OPERID already exists");
                return [
                    'status' => 'error',
                    'message' => 'OPERID already exists'
                ];
            }

            // Set default values for optional fields
            $data['cardid'] = $data['cardid'] ?? '';
            $data['ugroup'] = $data['ugroup'] ?? '';

            error_log("All fields validated, proceeding with insert");

            $sql = "INSERT INTO CDAS.OTS_USER 
                    (CARDID, OPERID, FIRSTNAME, LASTNAME, TYPE, UGROUP, COMPANY, LASTUPDATE) 
                    VALUES 
                    (:cardid, :operid, :firstname, :lastname, :type, :ugroup, :company, SYSDATE)";

            error_log("SQL Query: $sql");
            error_log("Parameters: " . print_r([
                'cardid' => $data['cardid'],
                'operid' => $data['operid'],
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'type' => $data['type'],
                'ugroup' => $data['ugroup'],
                'company' => $data['company']
            ], true));

            // Insert into first database
            $stid = oci_parse($this->db, $sql);
            $this->bindWorkerParams($stid, $data);
            
            if (!oci_execute($stid, OCI_DEFAULT)) {
                $e = oci_error($stid);
                oci_rollback($this->db);
                error_log("Database Error: " . $e['message']);
                return [
                    'status' => 'error',
                    'message' => 'Database error: ' . $e['message']
                ];
            }

            error_log("First database inserted successfully");

            // If SMK, also insert into second database
            if ($data['company'] === 'SMK' && $this->db_mk2) {
                error_log("Inserting into second database for SMK");
                $stid_mk2 = oci_parse($this->db_mk2, $sql);
                $this->bindWorkerParams($stid_mk2, $data);
                
                if (!oci_execute($stid_mk2, OCI_DEFAULT)) {
                    $e = oci_error($stid_mk2);
                    oci_rollback($this->db);
                    oci_rollback($this->db_mk2);
                    error_log("Database Error (MK2): " . $e['message']);
                    return [
                        'status' => 'error',
                        'message' => 'Database error (MK2): ' . $e['message']
                    ];
                }
                oci_commit($this->db_mk2);
                error_log("Second database inserted successfully");
            }

            oci_commit($this->db);
            error_log("Insert completed successfully");
            return [
                'status' => 'success',
                'data' => []
            ];
            
        } catch (Exception $e) {
            oci_rollback($this->db);
            if ($this->db_mk2) oci_rollback($this->db_mk2);
            error_log("Error in addWorker: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function updateWorker($operId, $data) {
        try {
            error_log("updateWorker called with operId: $operId");
            error_log("Data received: " . print_r($data, true));
            
            if (empty($operId) || empty($data['company'])) {
                error_log("Missing required fields: operId or company");
                return [
                    'status' => 'error',
                    'message' => 'Required fields missing: operId and company are required'
                ];
            }

            // Validate required fields (only firstname, lastname, and type are required)
            $required_fields = ['firstname', 'lastname', 'type'];
            foreach ($required_fields as $field) {
                if (empty($data[$field])) {
                    error_log("Missing required field: $field");
                    return [
                        'status' => 'error',
                        'message' => "Required field missing: $field"
                    ];
                }
            }

            // Set default values for optional fields
            $data['cardid'] = $data['cardid'] ?? '';
            $data['ugroup'] = $data['ugroup'] ?? '';

            error_log("All fields validated, proceeding with update");

            $sql = "UPDATE CDAS.OTS_USER 
                    SET CARDID = :cardid,
                        FIRSTNAME = :firstname,
                        LASTNAME = :lastname,
                        TYPE = :type,
                        UGROUP = :ugroup,
                        LASTUPDATE = SYSDATE
                    WHERE OPERID = :operid AND COMPANY = :company";

            error_log("SQL Query: $sql");
            error_log("Parameters: " . print_r([
                'cardid' => $data['cardid'],
                'firstname' => $data['firstname'],
                'lastname' => $data['lastname'],
                'type' => $data['type'],
                'ugroup' => $data['ugroup'],
                'operid' => $operId,
                'company' => $data['company']
            ], true));

            // Update in first database
            $stid = oci_parse($this->db, $sql);
            $this->bindWorkerParams($stid, $data);
            
            if (!oci_execute($stid, OCI_DEFAULT)) {
                $e = oci_error($stid);
                oci_rollback($this->db);
                error_log("Database Error: " . $e['message']);
                return [
                    'status' => 'error',
                    'message' => 'Database error: ' . $e['message']
                ];
            }

            error_log("First database updated successfully");

            // If SMK, also update in second database
            if ($data['company'] === 'SMK' && $this->db_mk2) {
                error_log("Updating second database for SMK");
                $stid_mk2 = oci_parse($this->db_mk2, $sql);
                $this->bindWorkerParams($stid_mk2, $data);
                
                if (!oci_execute($stid_mk2, OCI_DEFAULT)) {
                    $e = oci_error($stid_mk2);
                    oci_rollback($this->db);
                    oci_rollback($this->db_mk2);
                    error_log("Database Error (MK2): " . $e['message']);
                    return [
                        'status' => 'error',
                        'message' => 'Database error (MK2): ' . $e['message']
                    ];
                }
                oci_commit($this->db_mk2);
                error_log("Second database updated successfully");
            }

            oci_commit($this->db);
            error_log("Update completed successfully");
            return [
                'status' => 'success',
                'data' => []
            ];
            
        } catch (Exception $e) {
            oci_rollback($this->db);
            if ($this->db_mk2) oci_rollback($this->db_mk2);
            error_log("Error in updateWorker: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    public function deleteWorker($operId, $role) {
        try {
            error_log("deleteWorker called with operId: $operId, role: $role");

            if (empty($operId) || empty($role)) {
                error_log("Missing required fields: operId or role");
                return [
                    'status' => 'error',
                    'message' => 'Required fields missing: operId and role are required'
                ];
            }

            $sql = "DELETE FROM CDAS.OTS_USER WHERE OPERID = :operid AND COMPANY = :company";
            error_log("SQL Query: $sql");
            error_log("Parameters: " . print_r([
                'operid' => $operId,
                'company' => $role
            ], true));
            
            // Delete from first database
            $stid = oci_parse($this->db, $sql);
            oci_bind_by_name($stid, ":operid", $operId);
            oci_bind_by_name($stid, ":company", $role);
            
            if (!oci_execute($stid, OCI_DEFAULT)) {
                $e = oci_error($stid);
                oci_rollback($this->db);
                error_log("Database Error: " . $e['message']);
                return [
                    'status' => 'error',
                    'message' => 'Database error: ' . $e['message']
                ];
            }

            error_log("First database deleted successfully");

            // If SMK, also delete from second database
            if ($role === 'SMK' && $this->db_mk2) {
                error_log("Deleting from second database for SMK");
                $stid_mk2 = oci_parse($this->db_mk2, $sql);
                oci_bind_by_name($stid_mk2, ":operid", $operId);
                oci_bind_by_name($stid_mk2, ":company", $role);
                
                if (!oci_execute($stid_mk2, OCI_DEFAULT)) {
                    $e = oci_error($stid_mk2);
                    oci_rollback($this->db);
                    oci_rollback($this->db_mk2);
                    error_log("Database Error (MK2): " . $e['message']);
                    return [
                        'status' => 'error',
                        'message' => 'Database error (MK2): ' . $e['message']
                    ];
                }
                oci_commit($this->db_mk2);
                error_log("Second database deleted successfully");
            }

            oci_commit($this->db);
            error_log("Delete completed successfully");
            return [
                'status' => 'success',
                'data' => []
            ];
            
        } catch (Exception $e) {
            oci_rollback($this->db);
            if ($this->db_mk2) oci_rollback($this->db_mk2);
            error_log("Error in deleteWorker: " . $e->getMessage());
            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }

    private function bindWorkerParams($stid, $data) {
        oci_bind_by_name($stid, ":operid", $data['operid']);
        oci_bind_by_name($stid, ":cardid", $data['cardid']);
        oci_bind_by_name($stid, ":firstname", $data['firstname']);
        oci_bind_by_name($stid, ":lastname", $data['lastname']);
        oci_bind_by_name($stid, ":type", $data['type']);
        oci_bind_by_name($stid, ":ugroup", $data['ugroup']);
        oci_bind_by_name($stid, ":company", $data['company']);
    }
}
