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
}