import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import LabelIcon from '@mui/icons-material/Label';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import AssignmentIcon from '@mui/icons-material/Assignment';

VistaDetalleCategoria.propTypes = {
  data: PropTypes.shape({
    idCategoria: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombre: PropTypes.string,
    cantidadEtiquetas: PropTypes.number,
    etiquetas: PropTypes.arrayOf(
      PropTypes.shape({
        idEtiqueta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nombre: PropTypes.string,
        idSLA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        descripcionSLA: PropTypes.string,
        tiempoMaximoResolucion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        tiempoMaximoRepuesta: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    )
  }).isRequired
};

export function VistaDetalleCategoria({ data }) {
  const getCategoriaColor = (nombre) => {
    if (!nombre) return 'primary';
    const hash = nombre.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colores = ['primary', 'secondary', 'success', 'warning', 'info', 'error'];
    return colores[hash % colores.length];
  };

  const color = getCategoriaColor(data.nombre || '');

  const formatearTiempo = (tiempo) => {
    if (!tiempo) return 'N/A';
    return `${tiempo} hrs`;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardHeader
            sx={{
              backgroundColor: (theme) => theme.palette[color].main,
              color: 'white',
            }}
            avatar={
              <Avatar sx={{ 
                bgcolor: 'white', 
                color: `${color}.main`, 
                width: 56, 
                height: 56 
              }}>
                <CategoryIcon fontSize="large" />
              </Avatar>
            }
            title={
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {data.nombre || 'Sin nombre'}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                ID: {data.idCategoria || 'Sin ID'}
              </Typography>
            }
          />

          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: `${color}.50`,
                    border: `1px solid`,
                    borderColor: `${color}.200`,
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LabelIcon sx={{ mr: 1, color: `${color}.main` }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Etiquetas
                    </Typography>
                  </Box>
                  <Typography variant="h3" color={`${color}.main`} sx={{ fontWeight: 'bold' }}>
                    {data.cantidadEtiquetas || 0}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card elevation={3}>
          <CardHeader
            sx={{ 
              backgroundColor: `${color}.light`,
              color: `${color}.contrastText`
            }}
            avatar={
              <Avatar sx={{ bgcolor: `${color}.main` }}>
                <AssignmentIcon />
              </Avatar>
            }
            title={
              <Typography variant="h6">
                Etiquetas y SLA Asociados
              </Typography>
            }
          />
          <CardContent sx={{ p: 0 }}>
            {data.etiquetas && data.etiquetas.length > 0 ? (
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.100' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>ID Etiqueta</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Etiqueta</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>ID SLA</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Descripción SLA</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <TimerIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                          Tiempo Máx. Resolución
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <AccessTimeIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
                          Tiempo Máx. Respuesta
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.etiquetas.map((etiqueta, index) => (
                      <TableRow 
                        key={etiqueta.idEtiqueta || index}
                        sx={{ 
                          '&:hover': { backgroundColor: 'grey.50' },
                          '&:last-child td, &:last-child th': { border :0 }
                        }}
                      >
                        <TableCell>
                          <Chip 
                            label={etiqueta.idEtiqueta || 'N/A'} 
                            size="small" 
                            color={color}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LabelIcon sx={{ mr: 1, color: `${color}.main`, fontSize: '1.2rem' }} />
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {etiqueta.nombre || 'Sin nombre'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {etiqueta.idSLA || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {etiqueta.descripcionSLA || 'Sin descripción'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={formatearTiempo(etiqueta.tiempoMaximoResolucion)}
                            color="success"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={formatearTiempo(etiqueta.tiempoMaximoRepuesta)}
                            color="info"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <LabelIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No hay etiquetas asignadas a esta categoría
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}