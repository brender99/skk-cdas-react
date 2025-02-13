<?php

class UserGroupController {
  private $db;

  public function __construct($db) {
    $this->db = $db;
  }

  public function getUserGroups($company) {
    try {
      if ($company !== 'SKK') {
        return [
          'status' => 'success',
          'data' => []
        ];
      }

      $sql = "SELECT GROUPNAME FROM CDAS.OTS_USER_GROUP WHERE COMPANY = :company ORDER BY GROUPNAME";
      
      $stid = oci_parse($this->db, $sql);
      oci_bind_by_name($stid, ":company", $company);
      
      if (!oci_execute($stid)) {
        $e = oci_error($stid);
        error_log("Database Error: " . $e['message']);
        return [
          'status' => 'error',
          'message' => 'Database error: ' . $e['message']
        ];
      }
      
      $groups = [];
      while ($row = oci_fetch_array($stid, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $groups[] = array_change_key_case($row, CASE_LOWER);
      }
      
      return [
        'status' => 'success',
        'data' => $groups
      ];

    } catch (Exception $e) {
      error_log("Error in getUserGroups: " . $e->getMessage());
      return [
        'status' => 'error',
        'message' => $e->getMessage()
      ];
    }
  }
}
