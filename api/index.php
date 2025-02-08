<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get the request method and URI
$request_method = $_SERVER["REQUEST_METHOD"];
$request_uri = $_SERVER['REQUEST_URI'];

// Remove base path from URI
$base_path = '/api/';
$path = str_replace($base_path, '', parse_url($request_uri, PHP_URL_PATH));

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
