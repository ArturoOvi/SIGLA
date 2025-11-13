<?php
class PuestoModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todos los puestos */
    public function all()
    {
        try {
            $vSql = "SELECT 
                idPuesto,
                nombrePuesto,
                descripcionPuesto,
                idDepartamento
            FROM puesto
            ORDER BY nombrePuesto;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener un puesto por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM puesto WHERE idPuesto = $id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }
}