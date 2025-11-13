<?php
class usuario
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new UsuarioModel();
            $result = $modelo->all();
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $response = new Response();
            $modelo = new UsuarioModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByRol($idRol)
    {
        try {
            $response = new Response();
            $modelo = new UsuarioModel();
            $result = $modelo->getByRol($idRol);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function update($id)
{
    try {
        $response = new Response();
        $modelo = new UsuarioModel();
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $modelo->update($id, $data);
        $response->toJSON($result);
    } catch (Exception $e) {
        handleException($e);
    }
}

public function delete($id)
{
    try {
        $response = new Response();
        $modelo = new UsuarioModel();
        $result = $modelo->delete($id);
        $response->toJSON($result);
    } catch (Exception $e) {
        handleException($e);
    }
}

public function create()
{
    try {
        $response = new Response();
        $modelo = new UsuarioModel();
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Generar una contraseña por defecto o usar la proporcionada
        if (!isset($data['contrasenna']) || empty($data['contrasenna'])) {
            $data['contrasenna'] = password_hash('temporal123', PASSWORD_DEFAULT);
        } else {
            $data['contrasenna'] = password_hash($data['contrasenna'], PASSWORD_DEFAULT);
        }
        
        $result = $modelo->create($data);
        $response->toJSON($result);
    } catch (Exception $e) {
        handleException($e);
    }
}

}