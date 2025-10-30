<?php
class UsuarioModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todos los usuarios */
    public function all()
    {
        try {
            $vSql = "SELECT * FROM usuario;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener un usuario por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM usuario WHERE idUsuario = $id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener usuarios por rol (opcional) */
    public function getByRol($idRol)
    {
        try {
            $vSql = "SELECT * FROM usuario WHERE idRol = $idRol;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
        }
}
