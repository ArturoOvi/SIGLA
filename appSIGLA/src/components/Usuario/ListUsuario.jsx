import * as React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

export default function ListUsuario() {
  //Enlaces o redireccionar
  const navigate = useNavigate();
  //Datos a cargar en la tabla
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    UsuarioService.getUsuarios()
      .then((response) => {
        console.log(response);
        setData(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        if (error instanceof SyntaxError) {
          setError(error);
          console.log(error);
          setLoaded(false);
          throw new Error("Respuesta no válida del servidor");
        }
      });
  }, []);

  const detail = (id) => {
    return navigate(`/usuario/${id}`);
  };

  const editar = (id) => {
    return navigate(`/usuarios/editar/${id}`);
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      try {
        await UsuarioService.deleteUsuario(id);
        // Recargar la lista después de eliminar
        const response = await UsuarioService.getUsuarios();
        setData(response.data);
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert("Error al eliminar el usuario");
      }
    }
  };

  //Mensaje cargando
  if (!loaded) return <p>Cargando...</p>;
  //Mensaje de error
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Listado de Usuarios
        <Tooltip title="Crear">
          <IconButton component={Link} to="/usuarios/nuevo" color="success">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"># ID</TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Puesto</TableCell>
              <TableCell align="left">Rol</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.idUsuario}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.idUsuario}</TableCell>
                <TableCell align="left">{row.nombre} {row.apellido1} {row.apellido2}</TableCell>
                <TableCell align="left">{row.nombrePuesto || "N/A"}</TableCell>
                <TableCell align="left">
                  {row.rol || row.descripcionRol || "N/A"}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver">
                    <IconButton
                      onClick={() => detail(row.idUsuario)}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={() => editar(row.idUsuario)}
                      color="success"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => eliminar(row.idUsuario)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}