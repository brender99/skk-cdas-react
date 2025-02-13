<?php
// CORS headers are now handled in index.php
require_once '../config/database.php';
require_once '../controllers/WorkerController.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $role = isset($_GET['role']) ? strtoupper($_GET['role']) : 'SKK';
        $plant = isset($_GET['plant']) ? $_GET['plant'] : null;
        
        $database = new Database();
        $db = $database->getConnection($role, $plant);
        
        if (!$db) {
            throw new Exception("Database connection failed");
        }
        
        $controller = new WorkerController($db);
        $result = $controller->getWorkers($role);
        
        if ($result['status'] === 'success') {
            http_response_code(200);
        } else {
            http_response_code(500);
            error_log("Worker Error: " . ($result['message'] ?? 'Unknown error'));
        }
        
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        error_log("Worker Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get data first to check if it's SMK
        $data = json_decode(file_get_contents('php://input'), true);
        error_log("Received POST data: " . print_r($data, true));
        
        // Use role from session instead of request data
        $role = isset($_SESSION['user']['role']) ? strtoupper($_SESSION['user']['role']) : 'SKK';
        $plant = isset($data['plant']) ? $data['plant'] : null;
        
        error_log("Role: $role, Plant: " . ($plant ?? 'null'));
        
        $database = new Database();
        $db = $database->getConnection($role, $plant);
        
        if (!$db) {
            throw new Exception("Database connection failed");
        }

        // If SMK, get connection for both databases
        $db_mk2 = null;
        if ($role === 'SMK') {
            $db_mk2 = $database->getConnection('SMK', 'KK2'); 
            if (!$db_mk2) {
                throw new Exception("CDASMK2 Database connection failed");
            }
        }
        
        $controller = new WorkerController($db, $db_mk2);
        
        if (isset($data['action'])) {
            switch ($data['action']) {
                case 'update':
                    if (!isset($data['operId'])) {
                        throw new Exception('OperId is required for update operation');
                    }
                    error_log("Updating worker with operId: " . $data['operId']);
                    $result = $controller->updateWorker($data['operId'], $data);
                    break;
                    
                case 'delete':
                    if (!isset($data['operId']) || !isset($data['role'])) {
                        throw new Exception('OperId and role are required for delete operation');
                    }
                    error_log("Deleting worker with operId: " . $data['operId']);
                    $result = $controller->deleteWorker($data['operId'], $data['role']);
                    break;
                    
                default:
                    error_log("Adding new worker");
                    $result = $controller->addWorker($data);
            }
        } else {
            error_log("Adding new worker (no action specified)");
            $result = $controller->addWorker($data);
        }
        
        error_log("Operation result: " . print_r($result, true));
        
        if ($result['status'] === 'success') {
            http_response_code(200);
        } else {
            http_response_code(500);
            error_log("Worker Error: " . ($result['message'] ?? 'Unknown error'));
        }
        
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        error_log("Worker Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ], JSON_UNESCAPED_UNICODE);
}
