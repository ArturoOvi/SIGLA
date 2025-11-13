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
            $vSql = "SELECT 
            u.idUsuario,
            u.nombre,
            u.apellido1,
            u.apellido2,
            u.telefono,
            u.direccion,
            u.correo,
            u.numerodeCuenta,
            u.fechaIngreso,
            u.salario,
            u.saldoVacaciones,
            u.estado,
            u.idDepartamento,
            u.idPuesto,
            u.idRol,
            d.nombreDepartamento,
            p.nombrePuesto,
            r.descripcionRol
        FROM usuario u
        LEFT JOIN departamento d ON u.idDepartamento = d.idDepartamento
        LEFT JOIN puesto p ON u.idPuesto = p.idPuesto
        LEFT JOIN rol r ON u.idRol = r.idRol
        ORDER BY u.idUsuario;";
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

    /* Actualizar usuario por ID */
public function update($id, $data)
{
    try {
        $vSql = "UPDATE usuario SET 
            nombre = '{$data['nombre']}',
            apellido1 = '{$data['apellido1']}',
            apellido2 = '{$data['apellido2']}',
            telefono = '{$data['telefono']}',
            direccion = '{$data['direccion']}',
            correo = '{$data['correo']}',
            numerodeCuenta = '{$data['numerodeCuenta']}',
            fechaIngreso = '{$data['fechaIngreso']}',
            salario = '{$data['salario']}',
            saldoVacaciones = '{$data['saldoVacaciones']}',
            idDepartamento = '{$data['idDepartamento']}',
            idPuesto = '{$data['idPuesto']}',
            idRol = '{$data['idRol']}',
            estado = '{$data['estado']}',
            contrasenna = '{$data['contrasenna']}'
        WHERE idUsuario = $id;";
        
        $this->enlace->ExecuteSQL($vSql);
        return ['success' => true];
    } catch (Exception $e) {
        handleException($e);
    }
}

/* Eliminar usuario por ID */
public function delete($id)
{
    try {
        $vSql = "DELETE FROM usuario WHERE idUsuario = $id;";
        $this->enlace->ExecuteSQL($vSql);
        return ['success' => true];
    } catch (Exception $e) {
        handleException($e);
    }
}

/* Crear un nuevo usuario */
public function create($data)
{
    try {
        $vSql = "INSERT INTO usuario (
            nombre,
            apellido1,
            apellido2,
            telefono,
            direccion,
            correo,
            numerodeCuenta,
            fechaIngreso,
            salario,
            saldoVacaciones,
            estado,
            idDepartamento,
            idPuesto,
            idRol,
            contrasenna
        ) VALUES (
            '{$data['nombre']}',
            '{$data['apellido1']}',
            '{$data['apellido2']}',
            '{$data['telefono']}',
            '{$data['direccion']}',
            '{$data['correo']}',
            '{$data['numerodeCuenta']}',
            '{$data['fechaIngreso']}',
            '{$data['salario']}',
            '{$data['saldoVacaciones']}',
            '{$data['estado']}',
            '{$data['idDepartamento']}',
            '{$data['idPuesto']}',
            '{$data['idRol']}',
            '{$data['contrasenna']}'
        );";
        
        $this->enlace->ExecuteSQL($vSql);
        
        // Obtener el ID del usuario recién creado
        $lastId = $this->enlace->getLastInsertId();
        
        return [
            'idUsuario' => $lastId,
            'nombre' => $data['nombre'],
            'apellido1' => $data['apellido1']
        ];
    } catch (Exception $e) {
        handleException($e);
    }
}

}
