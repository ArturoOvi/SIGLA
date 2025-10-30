<?php
class ImagenModel {
    public $enlace;
    public function __construct() { $this->enlace = new MySqlConnect(); }

    public function all() {
        return $this->enlace->ExecuteSQL("SELECT * FROM imagen;");
    }

    public function get($id) {
        $r = $this->enlace->ExecuteSQL("SELECT * FROM imagen WHERE idImagen = $id;");
        return $r[0];
    }
}