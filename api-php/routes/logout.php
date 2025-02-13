<?php
// CORS headers are now handled in index.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Clear all session data
        session_start();
        session_unset();
        session_destroy();
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ]);
    } catch (Exception $e) {
        error_log("Logout Error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed'
    ]);
}
