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
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelIcon from '@mui/icons-material/Label';
import CategoryIcon from '@mui/icons-material/Category';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketService from '../../services/TicketService';

export function DetailTicket() {
  const routeParams = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Cargando ticket ID:', routeParams.id);
    
    TicketService.getTicket(routeParams.id)
      .then((response) => {
        console.log('Datos del ticket:', response.data);
        setData(response.data);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error al cargar ticket:', error);
        setError(error.message || 'Error al cargar el ticket');
        setLoaded(true);
      });
  }, [routeParams.id]);

  const formatFecha = (fecha) => {
    if (!fecha || fecha === '0000-00-00') return 'No definida';
    const date = new Date(fecha);
    return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'warning',
      'En progreso': 'info',
      'Resuelto': 'success',
      'Cancelado': 'error',
    };
    return colores[estado] || 'default';
  };

  const getPrioridadColor = (prioridad) => {
    const colores = {
      'Baja': 'success',
      'Media': 'warning',
      'Alta': 'error',
    };
    return colores[prioridad] || 'default';
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
          onClick={() => navigate('/tickets')}
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
        <Alert severity="info">No se encontró el ticket</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/tickets')}
          sx={{ mt: 2 }}
        >
          Volver a la lista
        </Button>
      </Container>
    );
  }

  return (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      {/* Botón de regreso */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/tickets')}
        sx={{ mb: 2 }}
      >
        Volver a la lista
      </Button>

      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Encabezado del Ticket */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {data.titulo}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ticket #{data.idTicket}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              <Chip 
                label={data.estado} 
                color={getEstadoColor(data.estado)}
                size="small"
              />
              <Chip 
                label={data.prioridad} 
                color={getPrioridadColor(data.prioridad)}
                icon={<PriorityHighIcon />}
                size="small"
              />
              <Chip 
                label={data.categoria} 
                icon={<CategoryIcon />}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Grid Principal */}
          <Grid container spacing={3}>
            {/* Columna Izquierda - Información Principal */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', mb: 3 }}>
                <Typography variant="body1">
                  {data.descripcion || 'Sin descripción'}
                </Typography>
              </Card>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                <LabelIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Etiqueta
              </Typography>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body1">
                  {data.etiqueta || 'Sin etiqueta'}
                </Typography>
              </Card>
            </Grid>

            {/* Columna Derecha - Personas y Fechas */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <PersonIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                  Solicitante
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {data.nombreCliente || 'No asignado'}
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <EngineeringIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                  Técnico Asignado
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {data.nombreTecnico || 'No asignado'}
                </Typography>
              </Card>

              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20 }} />
                  Fechas Importantes
                </Typography>
                
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Creación:</strong> {formatFecha(data.fechaCreacion)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Cierre:</strong> {formatFecha(data.fechaCierre)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* SLA (Service Level Agreement) */}
          <Typography variant="h6" gutterBottom>
            <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Tiempos de Servicio (SLA)
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Máximo para Respuesta
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {formatFecha(data.SLAMaxRespuesta)}
                </Typography>
                <Chip 
                  label={data.cumplimientoRespuesta === "1" ? "Cumplido" : "Pendiente"} 
                  color={data.cumplimientoRespuesta === "1" ? "success" : "warning"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Máximo para Resolución
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {formatFecha(data.SLAMaxResolucion)}
                </Typography>
                <Chip 
                  label={data.cumplimientoResolucion === "1" ? "Cumplido" : "Pendiente"} 
                  color={data.cumplimientoResolucion === "1" ? "success" : "warning"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Card>
            </Grid>
          </Grid>

          {/* Información Adicional */}
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Información Adicional
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary">
                ID del Ticket
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {data.idTicket}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary">
                Prioridad
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {data.prioridad}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="caption" color="text.secondary">
                Categoría
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {data.categoria}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}