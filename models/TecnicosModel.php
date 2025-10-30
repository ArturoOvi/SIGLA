<?php
class tecnicoModel
{
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /* Listar todos los usuarios técnicos */
    public function all()
    {
        try {
            // Suponiendo que los técnicos tienen un idRol específico, por ejemplo 2
            $vSql = "SELECT 
                        usuario.idUsuario,
                        CONCAT(usuario.nombre, ' ', usuario.apellido1, ' ', IFNULL(usuario.apellido2, '')) AS nombreCompleto,
                        usuario.telefono,
                        usuario.direccion,
                        usuario.correo,
                        usuario.numeroDeCuenta,
                        usuario.fechaIngreso,
                        usuario.salario,
                        usuario.saldoVacaciones,
                        departamento.nombreDepartamento,
                        puesto.nombrePuesto,
                        rol.descripcionRol,
                        usuario.estado
                        FROM usuario
                        JOIN departamento  ON usuario.idDepartamento = departamento.idDepartamento
                        JOIN puesto  ON usuario.idPuesto = puesto.idPuesto
                        JOIN rol  ON usuario.idRol = rol.idRol
                        WHERE usuario.idRol = 2;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener un técnico por ID */
    public function get($id)
    {
        try {
            $vSql = "SELECT 
                    usuario.idUsuario,
                    CONCAT(usuario.nombre, ' ', usuario.apellido1, ' ', IFNULL(usuario.apellido2, '')) AS nombreCompleto,
                    usuario.telefono,
                    usuario.direccion,
                    usuario.correo,
                    usuario.numeroDeCuenta,
                    usuario.fechaIngreso,
                    usuario.salario,
                    usuario.saldoVacaciones,
                    departamento.nombreDepartamento,
                    puesto.nombrePuesto,
                    rol.descripcionRol,
                    usuario.estado,
                    COUNT(ticket.idTicket) AS cantidadTickets
                    FROM usuario
                    JOIN departamento  ON usuario.idDepartamento = departamento.idDepartamento
                    JOIN puesto  ON usuario.idPuesto = puesto.idPuesto
                    JOIN rol  ON usuario.idRol = rol.idRol
                    LEFT JOIN ticket ON usuario.idUsuario = ticket.idUsuarioTecnico
                    where usuario.idUsuario=$id;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado[0];
        } catch (Exception $e) {
            handleException($e);
        }
    }

    /* Obtener tickets asignados a un técnico */
    public function getTicketsAsignados($idTecnico)
    {
        try {
            $vSql = "SELECT * FROM ticket WHERE idUsuarioTecnico = $idTecnico;";
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado;
        } catch (Exception $e) {
            handleException($e);
    }
    }
}