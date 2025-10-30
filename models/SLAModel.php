<?php
class SlaModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function all()
    {
        try {
            $vSql = "SELECT * FROM sla;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM sla WHERE idSLA = $id;";
            $resultado = $this->enlace->ExecuteSQL($vSql);
            return $resultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByCategoria($idCategoria)
    {
        try {
            $vSql = "SELECT * FROM sla WHERE idCategoria = $idCategoria;";
            return $this->enlace->ExecuteSQL($vSql);
        } catch (Exception $e) {
            handleException($e);
        }
    }
}