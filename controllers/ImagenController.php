<?php
class imagen 
{
    public function index() {
        try {
            $response = new Response();
            $modelo = new ImagenModel();
            $result = $modelo->all();
            $response->toJSON($result);
        } catch (Exception $e) { handleException($e); }
    }

    public function get($id) {
        try {
            $response = new Response();
            $modelo = new ImagenModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) { handleException($e); }
    }
}
