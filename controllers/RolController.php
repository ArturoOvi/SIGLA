<?php
class Rol
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new RolModel();
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
            $modelo = new RolModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}