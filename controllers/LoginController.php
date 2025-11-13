<?php
class login
{
    public function auth()
    {
        try {
            // Headers CORS
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
            
            // Preflight
            if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                http_response_code(200);
                exit();
            }

            // Leer el body directamente
            $json = file_get_contents('php://input');
            $data = json_decode($json, true); // 👈 true = devolver array en vez de objeto
            
            // Log para debug
            error_log("Login data: " . print_r($data, true));

            $usuario = $data['usuario'] ?? '';
            $clave = $data['clave'] ?? '';

            if (empty($usuario) || empty($clave)) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Usuario y contraseña requeridos'
                ]);
                return;
            }

            $modelo = new LoginModel();
            $resultado = $modelo->validate($usuario, $clave);

            if ($resultado) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'usuario' => $resultado,
                    'token' => bin2hex(random_bytes(32))
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Credenciales inválidas'
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            error_log("Login exception: " . $e->getMessage());
            echo json_encode([
                'success' => false,
                'message' => 'Error del servidor: ' . $e->getMessage()
            ]);
        }
    }
}