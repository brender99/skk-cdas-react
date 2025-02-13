<?php
// CORS headers are now handled in index.php
require_once '../config/database.php';
require_once '../controllers/AuthController.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->username) && !empty($data->password)) {
        // Initialize database connection
        $database = new Database();
        
        // Get user role from credentials
        $userRole = null;
        $plant = null;
        
        if ($data->username === 'skk' && $data->password === 'skk@dmin') {
            $userRole = 'SKK';
        } else if ($data->username === 'smk' && $data->password === 'smk@dmin') {
            $userRole = 'SMK';
            // Note: Plant will be selected by user after login for SMK
            // Default to KK1
            $plant = 'KK1';
        }
        
        // Get database connection with role and plant
        $db = $database->getConnection($userRole, $plant);
        $auth = new AuthController($db);
        
        $result = $auth->login($data->username, $data->password);
        
        if ($result['success']) {
            // Add plant information for SMK users
            if ($userRole === 'SMK') {
                $result['user']['plants'] = ['KK1', 'KK2'];
                $result['user']['currentPlant'] = $plant;
            }
            http_response_code(200);
        } else {
            http_response_code(401);
        }
        
        echo json_encode($result);
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Username and password are required."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
