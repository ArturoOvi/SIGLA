<?php
class tecnico
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new tecnicoModel();
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
            $modelo = new tecnicoModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getTicketsAsignados($idTecnico)
    {
        try {
            $response = new Response();
            $modelo = new tecnicoModel();
            $result = $modelo->getTicketsAsignados($idTecnico);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
    }
    }
}