<?php
class CategoriaModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todas las categorías */
    public function all()
    {
        try {
            $vSql = "SELECT 
                    categoria.idcategoria,
                    categoria.descripcionCategoria AS nombre,
                    COUNT(etiqueta.idEtiqueta) AS cantidadEtiquetas
                    FROM categoria
                    LEFT JOIN etiqueta ON categoria.idCategoria = etiqueta.idCategoria
                    GROUP BY categoria.idcategoria, categoria.descripcionCategoria;";
         $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener una categoría por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT 
                    categoria.idcategoria,
                    categoria.descripcionCategoria AS nombre,
                    etiqueta.idEtiqueta,
                    etiqueta.descripcionCategoria AS etiqueta,
                    sla.idSLA,
                    sla.descripcion AS descripcionSLA,
                    sla.tiempoMaximoResolucion,
                    sla.tiempoMaximoRepuesta
                    FROM categoria 
                    LEFT JOIN etiqueta  ON categoria.idCategoria = etiqueta.idCategoria
                    LEFT JOIN sla  ON categoria.idCategoria = sla.idCategoria
                    WHERE categoria.idCategoria = $id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }
}