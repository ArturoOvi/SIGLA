<?php
class TicketModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todos los tickets */
  public function all()
{
    try {
        $vSql = "SELECT 
            ticket.idTicket,
            ticket.titulo,
            ticket.descripcion,
            ticket.fechaCreacion,
            ticket.idUsuarioTecnico,  
            estado.nombreEstado AS estado,
            prioridad.nombreprioridad AS prioridad,
            etiqueta.descripcionCategoria AS etiqueta,
            usuario.nombre AS nombreCliente,
            t.nombre AS nombreTecnico,
            ticket.fechaCierre,
            ticket.SLAMaxRespuesta,
            ticket.SLAMaxResolucion,
            categoria.descripcionCategoria AS categoria,
            ticket.cumplimientoRespuesta,
            ticket.cumplimientoResolucion
        FROM ticket
        JOIN estado ON ticket.idEstado = estado.idEstado
        JOIN usuario ON ticket.idUsuarioSolicitante = usuario.idUsuario
        JOIN usuario t ON ticket.idUsuarioTecnico = t.idUsuario
        JOIN categoria ON ticket.idCategoria = categoria.idCategoria
        JOIN etiqueta ON ticket.idEtiqueta = etiqueta.idEtiqueta
        JOIN prioridad ON ticket.idPrioridad = prioridad.idPrioridad;";

        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado;
    } catch (Exception $e) {
        handleException($e);
    }
}

    /* Obtener un ticket por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT 
                ticket.idTicket,
                ticket.titulo,
                ticket.descripcion,
                ticket.fechaCreacion,
                estado.nombreEstado AS estado,
                prioridad.nombreprioridad AS prioridad,
                etiqueta.descripcionCategoria AS etiqueta,
                usuario.nombre AS nombreCliente,
                t.nombre AS nombreTecnico,
                ticket.fechaCierre,
                ticket.SLAMaxRespuesta,
                ticket.SLAMaxResolucion,
                categoria.descripcionCategoria AS categoria,
                ticket.cumplimientoRespuesta,
                ticket.cumplimientoResolucion
            FROM ticket
            JOIN estado ON ticket.idEstado = estado.idEstado
            JOIN usuario ON ticket.idUsuarioSolicitante = usuario.idUsuario
            JOIN usuario t ON ticket.idUsuarioTecnico = t.idUsuario
            JOIN categoria ON ticket.idCategoria = categoria.idCategoria
            JOIN etiqueta ON ticket.idEtiqueta = etiqueta.idEtiqueta
            JOIN prioridad ON ticket.idPrioridad = prioridad.idPrioridad
            WHERE ticket.idTicket = $id";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener tickets por usuario solicitante */
    public function getByUsuario($idUsuario)
    {
        try {
            $vSql = "SELECT * FROM ticket WHERE idUsuarioSolicitante = $idUsuario;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener tickets por estado */
    public function getByEstado($idEstado)
    {
        try {
            $vSql = "SELECT * FROM ticket WHERE idEstado = $idEstado;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener tickets por tecnico */
    public function getByTecnico($idTecnico)
    {
        try {
            $vSql = "SELECT * FROM ticket WHERE idUsuarioTecnico = $idTecnico;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* NUEVO: Obtener tickets para el calendario con filtros opcionales */
  /* NUEVO: Obtener tickets para el calendario con filtros opcionales */
public function getTicketsCalendario($idTecnico = null, $fechaInicio = null, $fechaFin = null)
{
    try {
        $vSql = "SELECT 
            ticket.idTicket,
            ticket.titulo,
            ticket.descripcion,
            ticket.fechaCreacion,
            ticket.fechaCierre,
            ticket.SLAMaxRespuesta,
            ticket.SLAMaxResolucion,
            ticket.cumplimientoRespuesta,
            ticket.cumplimientoResolucion,
            estado.idEstado,
            estado.nombreEstado AS estado,
            prioridad.idPrioridad,
            prioridad.nombreprioridad AS prioridad,
            etiqueta.idEtiqueta,
            etiqueta.descripcionCategoria AS etiqueta,
            categoria.idCategoria,
            categoria.descripcionCategoria AS categoria,
            usuario.idUsuario AS idUsuarioSolicitante,
            usuario.nombre AS nombreCliente,
            t.idUsuario AS idUsuarioTecnico,
            t.nombre AS nombreTecnico
        FROM ticket
        JOIN estado ON ticket.idEstado = estado.idEstado
        JOIN usuario ON ticket.idUsuarioSolicitante = usuario.idUsuario
        JOIN usuario t ON ticket.idUsuarioTecnico = t.idUsuario
        JOIN categoria ON ticket.idCategoria = categoria.idCategoria
        JOIN etiqueta ON ticket.idEtiqueta = etiqueta.idEtiqueta
        JOIN prioridad ON ticket.idPrioridad = prioridad.idPrioridad
        WHERE 1=1";  // 👈 ESTE WHERE 1=1 ES CRÍTICO
        
        // Filtrar por técnico si se proporciona
        if ($idTecnico !== null && $idTecnico !== 'all') {
            $vSql .= " AND ticket.idUsuarioTecnico = " . intval($idTecnico);
        }
        
        // Filtrar por rango de fechas si se proporciona
        if ($fechaInicio !== null && $fechaFin !== null) {
            $vSql .= " AND ticket.fechaCreacion BETWEEN '$fechaInicio' AND '$fechaFin'";
        }
        
        $vSql .= " ORDER BY ticket.fechaCreacion DESC;";
        
        $vResultado = $this->enlace->ExecuteSQL($vSql);
        return $vResultado;
        
    } catch (Exception $e) {
        handleException($e);
    }
}
}
?>