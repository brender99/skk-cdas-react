<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/database.php';
require_once '../controllers/DashboardController.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Get role and plant from query parameters
        $role = isset($_GET['role']) ? strtoupper($_GET['role']) : 'SKK';
        $plant = isset($_GET['plant']) ? $_GET['plant'] : null;
        
        $database = new Database();
        $db = $database->getConnection($role, $plant);
        
        if (!$db) {
            throw new Exception("Database connection failed");
        }
        
        $controller = new DashboardController($db);
        $result = $controller->getDashboardData($role, $plant);
        
        header('Content-Type: application/json; charset=utf-8');
        
        if ($result['success']) {
            http_response_code(200);
        } else {
            http_response_code(500);
            error_log("Dashboard Error: " . ($result['message'] ?? 'Unknown error'));
        }
        
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        error_log("Dashboard Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ], JSON_UNESCAPED_UNICODE);
}
?>
