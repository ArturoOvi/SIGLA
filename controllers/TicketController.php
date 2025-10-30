<?php
class ticket
{
    public function index()
    {
        try {
            $response = new Response();
            $modelo = new TicketModel();
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
            $modelo = new TicketModel();
            $result = $modelo->get($id);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function ticketsByTecnico($idTecnico)
    {
        try {
            $response = new Response();
            $modelo = new TicketModel();
            $result = $modelo->getByTecnico($idTecnico);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function ticketsByUsuario($idUsuario)
    {
        try {
            $response = new Response();
            $modelo = new TicketModel();
            $result = $modelo->getByUsuario($idUsuario);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function ticketsByEstado($idEstado)
    {
        try {
            $response = new Response();
            $modelo = new TicketModel();
            $result = $modelo->getByEstado($idEstado);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function ticketsCalendario()
    {
        try {
            $response = new Response();
            $modelo = new TicketModel();
            
            // Obtener parámetros de query string
            $idTecnico = isset($_GET['idTecnico']) ? $_GET['idTecnico'] : null;
            $fechaInicio = isset($_GET['fechaInicio']) ? $_GET['fechaInicio'] : null;
            $fechaFin = isset($_GET['fechaFin']) ? $_GET['fechaFin'] : null;
            
            // Log para debug
            error_log("📅 Calendario - Técnico: $idTecnico, Inicio: $fechaInicio, Fin: $fechaFin");
            
            $result = $modelo->getTicketsCalendario($idTecnico, $fechaInicio, $fechaFin);
            $response->toJSON($result);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}
?>