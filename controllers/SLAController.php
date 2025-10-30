<?php
class sla
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new SlaModel();
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
            $modelo = new SlaModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByCategoria($idCategoria)
    {
        try {
            $response = new Response();
            $modelo = new SlaModel();
            $result = $modelo->getByCategoria($idCategoria);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}