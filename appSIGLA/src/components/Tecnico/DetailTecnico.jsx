import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import EngineeringIcon from '@mui/icons-material/Engineering';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TecnicoService from '../../services/TecnicoService';

export function DetailTecnico() {
  const routeParams = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Cargando técnico ID:', routeParams.id);
    
    TecnicoService.getTecnico(routeParams.id)
      .then((response) => {
        console.log('Datos del técnico:', response.data);
        setData(response.data);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error al cargar técnico:', error);
        setError(error.message || 'Error al cargar el técnico');
        setLoaded(true);
      });
  }, [routeParams.id]);

  const formatidUsuario = (idUsuario) => {
    if (!idUsuario) return 'Sin cédula';
    const str = String(idUsuario);
    if (str.length === 9) {
      return `${str.slice(0, 1)}-${str.slice(1, 5)}-${str.slice(5)}`;
    }
    return idUsuario;
  };

  const getEstadoLabel = (estado) => {
    return estado === '1' || estado === 1 ? 'Activo' : 'Inactivo';
  };

  const getEstadoColor = (estado) => {
    return estado === '1' || estado === 1 ? 'success' : 'error';
  };

  if (!loaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/tecnicos')}
          sx={{ mt: 2 }}
        >
          Volver a la lista
        </Button>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">No se encontró el técnico</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/tecnicos')}
          sx={{ mt: 2 }}
        >
          Volver a la lista
        </Button>
      </Container>
    );
  }

  return (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/tecnicos')}
        sx={{ mb: 2 }}
      >
        Volver a la lista
      </Button>

      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Encabezado del Técnico */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                mr: 2
              }}
            >
              <EngineeringIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {data.nombre || data.nombreCompleto || 'Sin nombre'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Técnico #{data.idUsuario}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={getEstadoLabel(data.estado)}
                  color={getEstadoColor(data.estado)}
                  icon={data.estado === '1' || data.estado === 1 ? <CheckCircleIcon /> : <CancelIcon />}
                  size="small"
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Grid Principal */}
          <Grid container spacing={3}>
            {/* Columna Izquierda - Información Personal */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Información Personal
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BadgeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cédula" 
                    secondary={formatidUsuario(data.idUsuario || data.idTecnico)}
                  />
                </ListItem>

                {data.email && (
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={data.email}
                    />
                  </ListItem>
                )}

                {data.telefono && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Teléfono" 
                      secondary={data.telefono}
                    />
                  </ListItem>
                )}

                {data.especialidad && (
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Especialidad" 
                      secondary={data.especialidad}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>

            {/* Columna Derecha - Estadísticas */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Estadísticas
              </Typography>

              <Card variant="outlined" sx={{ mb: 2, p: 2, bgcolor: 'primary.light', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AssignmentIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">
                    Tickets Asignados
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {data.cantidadTickets || 0}
                </Typography>
              </Card>

              {data.ticketsResueltos !== undefined && (
                <Card variant="outlined" sx={{ mb: 2, p: 2, bgcolor: 'success.light', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">
                      Tickets Resueltos
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {data.ticketsResueltos}
                  </Typography>
                </Card>
              )}

              {data.ticketsPendientes !== undefined && (
                <Card variant="outlined" sx={{ p: 2, bgcolor: 'warning.light', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AssignmentIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">
                      Tickets Pendientes
                    </Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {data.ticketsPendientes}
                  </Typography>
                </Card>
              )}
            </Grid>
          </Grid>

          {/* Información Adicional */}
          {(data.direccion || data.fechaIngreso || data.departamento) && (
            <>
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Información Adicional
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {data.direccion && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="text.secondary">
                      Dirección
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {data.direccion}
                    </Typography>
                  </Grid>
                )}
                {data.fechaIngreso && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">
                      Fecha de Ingreso
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {new Date(data.fechaIngreso).toLocaleDateString('es-ES')}
                    </Typography>
                  </Grid>
                )}
                {data.departamento && (
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary">
                      Departamento
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {data.departamento}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}