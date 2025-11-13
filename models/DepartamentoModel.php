<?php
class DepartamentoModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todos los departamentos */
    public function all()
    {
        try {
            $vSql = "SELECT 
                idDepartamento,
                nombreDepartamento
            FROM departamento
            ORDER BY idDepartamento;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener un departamento por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM departamento WHERE idDepartamento = $id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }
}