<?php
class AuthController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function login($username, $password) {
        // Validate credentials
        if ($username === 'skk' && $password === 'skk@dmin') {
            return array(
                "success" => true,
                "user" => array(
                    "username" => $username,
                    "role" => "SKK",
                    "token" => $this->generateToken($username, "SKK")
                )
            );
        } else if ($username === 'smk' && $password === 'smk@dmin') {
            return array(
                "success" => true,
                "user" => array(
                    "username" => $username,
                    "role" => "SMK",
                    "token" => $this->generateToken($username, "SMK")
                )
            );
        }

        return array(
            "success" => false,
            "message" => "Invalid credentials"
        );
    }

    private function generateToken($username, $role) {
        // In production, use a proper JWT library
        return base64_encode(json_encode(array(
            "username" => $username,
            "role" => $role,
            "exp" => time() + (60 * 60) // 1 hour expiration
        )));
    }
}
?>
