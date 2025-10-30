<?php
class LoginModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    public function validate($usuario, $clave)
    {
        try {
            $vSql = "SELECT u.idUsuario, u.nombre, u.usuario, u.idRol, r.nombreRol
                     FROM usuario u
                     INNER JOIN rol r ON u.idRol = r.idRol
                     WHERE u.usuario = '$usuario' AND u.clave = '$clave';";

            $resultado = $this->enlace->ExecuteSQL($vSql);

            // Validación segura: si no hay resultados, retorna null
            if (is_array($resultado) && count($resultado) > 0) {
                return $resultado[0];
            } else {
                return null;
            }

        } catch (Exception $e) {
            handleException($e);
        }
    }
}