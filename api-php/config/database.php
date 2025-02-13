<?php
class Database {
    private $host = "172.31.55.37";
    private $username = "CDAS";
    private $password = "tamagot6ji";
    private $conn;

    // Constants for database names
    const DB_CDASKK2 = 'CDASKK2';  // For SKK and SMK KK1
    const DB_CDASMK2 = 'CDASMK2';  // For SMK KK2

    public function getConnection($userRole = null, $plant = null) {
        $this->conn = null;
        
        try {
            // Determine which database to use
            $dbName = $this->getDatabaseName($userRole, $plant);
            
            // Log connection attempt
            error_log("Attempting to connect to database: $dbName");
            
            $tns = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = {$this->host})(PORT = 1521)))(CONNECT_DATA=(SERVICE_NAME={$dbName})))";
            
            // Enable error reporting for oci_connect
            putenv('NLS_LANG=AMERICAN_AMERICA.AL32UTF8');
            
            $this->conn = @oci_connect($this->username, $this->password, $tns, 'AL32UTF8');
            
            if (!$this->conn) {
                $e = oci_error();
                error_log("Database connection failed: " . print_r($e, true));
                throw new Exception($e['message'] ?? "Connection failed");
            }
            
            error_log("Successfully connected to database: $dbName");
            return $this->conn;
            
        } catch(Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    private function getDatabaseName($userRole, $plant) {
        // SKK users always use CDASKK2
        if ($userRole === 'SKK') {
            return self::DB_CDASKK2;
        }
        
        // SMK users use different databases based on plant
        if ($userRole === 'SMK') {
            if ($plant === 'KK1') {
                return self::DB_CDASKK2;
            } else if ($plant === 'KK2') {
                return self::DB_CDASMK2;
            }
        }
        
        // Default to CDASKK2 if no specific case matches
        return self::DB_CDASKK2;
    }
}
?>
