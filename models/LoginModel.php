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
            // 
            $vSql = "
                SELECT 
                    usuario.idUsuario,
                    usuario.idRol,
                    usuario.nombre,
                    rol.descripcionRol
                FROM usuario
                INNER JOIN rol ON usuario.idRol = rol.idRol
                WHERE usuario.idUsuario = $usuario 
                AND usuario.contrasenna = '$clave'
                AND usuario.estado = 1";

            $resultado = $this->enlace->ExecuteSQL($vSql);

            if (is_array($resultado) && count($resultado) > 0) {
                return $resultado[0];
            } else {
                return null;
            }

        } catch (Exception $e) {
            handleException($e);
            return null;
        }
    }
}
