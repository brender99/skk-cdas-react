<?php
require_once '../config/database.php';
require_once '../controllers/UserGroupController.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $company = isset($_GET['company']) ? strtoupper($_GET['company']) : 'SKK';
        
        $database = new Database();
        $db = $database->getConnection();
        
        if (!$db) {
            throw new Exception("Database connection failed");
        }
        
        $controller = new UserGroupController($db);
        $result = $controller->getUserGroups($company);
        
        if ($result['status']) {
            http_response_code(200);
        } else {
            http_response_code(500);
            error_log("User Groups Error: " . ($result['message'] ?? 'Unknown error'));
        }
        
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        error_log("User Groups Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'status' => false,
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
}
