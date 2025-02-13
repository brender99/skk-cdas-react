<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

// Get the request method and URI
$request_method = $_SERVER["REQUEST_METHOD"];
$request_uri = $_SERVER['REQUEST_URI'];

// If it's an OPTIONS request, return immediately with 200 OK
if ($request_method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Remove base path from URI
$base_path = '/api-php/';  // Changed from /api/ to /api-php/
$path = str_replace($base_path, '', parse_url($request_uri, PHP_URL_PATH));

// Include routes
require __DIR__ . '/routes/auth.php';
require __DIR__ . '/routes/workers.php';
require __DIR__ . '/routes/dashboard.php';
require __DIR__ . '/routes/user-groups.php';

// Include controllers
require __DIR__ . '/controllers/AuthController.php';
require __DIR__ . '/controllers/WorkerController.php';
require __DIR__ . '/controllers/DashboardController.php';
require __DIR__ . '/controllers/UserGroupController.php';

// Route the request
switch($path) {
    case 'auth/login':
        require_once 'routes/auth.php';
        break;
    case 'workers':
        require_once 'routes/workers.php';
        break;
    case 'trucks':
        require_once 'routes/trucks.php';
        break;
    case 'reports/workers':
        require_once 'routes/reports/workers.php';
        break;
    case 'reports/bay':
        require_once 'routes/reports/bay.php';
        break;
    case 'reports/stock':
        require_once 'routes/reports/stock.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(array("message" => "Route not found."));
}
?>
