<?php
class login
{
    public function auth()
    {
        try {
            $request = new Request();
            $data = $request->getJSON();

            $usuario = $data['usuario'] ?? '';
            $clave = $data['clave'] ?? '';

            $modelo = new LoginModel();
            $resultado = $modelo->validate($usuario, $clave);

            $response = new Response();
            if ($resultado) {
                $response->toJSON([
                    'success' => true,
                    'usuario' => $resultado
                ]);
            } else {
                $response->toJSON([
                    'success' => false,
                    'message' => 'Credenciales inválidas'
                ]);
            }
        } catch (Exception $e) {
            handleException($e);
        }
    }
}