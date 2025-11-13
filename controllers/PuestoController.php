<?php
class Puesto
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new PuestoModel();
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
            $modelo = new PuestoModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}