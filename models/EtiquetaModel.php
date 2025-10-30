<?php
class EtiquetaModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todas las etiquetas */
    public function all()
    {
        try {
            $vSql = "SELECT * FROM etiqueta;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener una etiqueta por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT * FROM etiqueta WHERE idEtiqueta = $id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    public function getByCategoria($idCategoria)
    {
        try {
            $vSql = "SELECT * FROM etiqueta WHERE idCategoria = $idCategoria;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}