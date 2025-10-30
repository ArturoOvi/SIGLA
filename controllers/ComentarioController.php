<?php
class comentario
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new ComentarioModel();
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
            $modelo = new ComentarioModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByTicket($idTicket)
    {
        try {
            $response = new Response();
            $modelo = new ComentarioModel();
            $result = $modelo->getByTicket($idTicket);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create()
    {
        try {
            $request = new Request();
            $data = $request->getJSON();
            $modelo = new ComentarioModel();
            $resultado = $modelo->create($data);
            $response = new Response();
            $response->toJSON(['success' => $resultado]);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}

