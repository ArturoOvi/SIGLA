<?php
class ComentarioModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM comentario;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM comentario WHERE idComentario = $id;";
            $resultado = $this->enlace->ExecuteSQL($vSql);
            return $resultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByTicket($idTicket)
    {
        try {
            $vSql = "SELECT * FROM comentario WHERE idTicket = $idTicket ORDER BY fechaComentario ASC;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function create($data)
    {
        try {
            $contenido = $data['contenido'];
            $idTicket = $data['idTicket'];
            $idUsuario = $data['idUsuario'];
            $vSql = "INSERT INTO comentario (contenido, idTicket, idUsuario, fechaComentario) 
                     VALUES ('$contenido', $idTicket, $idUsuario, NOW());";
            return $this->enlace->ExecuteSQL_DML($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}