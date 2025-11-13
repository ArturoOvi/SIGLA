<?php
class RolModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todos los roles */
    public function all()
    {
        try {
            $vSql = "SELECT 
                idRol,
                descripcionRol
            FROM rol
            ORDER BY descripcionRol;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener un rol por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM rol WHERE idRol = $id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }
}