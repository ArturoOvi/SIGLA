import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LabelIcon from '@mui/icons-material/Label';
import VisibilityIcon from '@mui/icons-material/Visibility';

import TicketService from '../../services/TicketService';
import TecnicoService from '../../services/TecnicoService';

moment.locale('es');
const localizer = momentLocalizer(moment);

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Asignación',
  noEventsInRange: 'No hay asignaciones en este rango',
  showMore: total => `+ Ver más (${total})`
};

export function CalendarAsignaciones() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [tecnicoFilter, setTecnicoFilter] = useState('all');
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarTecnicos();
  }, []);

  useEffect(() => {
    cargarAsignaciones();
  }, [tecnicoFilter, date, view]);

  const cargarTecnicos = async () => {
    try {
      const response = await TecnicoService.getTecnicos();
      console.log('Técnicos cargados:', response.data);
      setTecnicos(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      console.error('Error al cargar técnicos:', err);
      setError('Error al cargar la lista de técnicos');
    }
  };

  const cargarAsignaciones = async () => {
    try {
      setLoading(true);
      setError('');
      
      const fechaInicio = moment(date).startOf(view).format('YYYY-MM-DD');
      const fechaFin = moment(date).endOf(view).format('YYYY-MM-DD');
      
      console.log('Cargando tickets del', fechaInicio, 'al', fechaFin);
      console.log('Filtro técnico:', tecnicoFilter);
      
      const response = await TicketService.getTickets();
      
      console.log('Response completo:', response);
      console.log('Tickets recibidos:', response.data);
      
      let tickets = response.data ? (Array.isArray(response.data) ? response.data : [response.data]) : [];
      
      console.log('Total tickets antes de filtrar:', tickets.length);
      console.log('Filtro técnico seleccionado:', tecnicoFilter, 'Tipo:', typeof tecnicoFilter);
      
      // Filtrar por técnico si no es 'all'
      if (tecnicoFilter !== 'all') {
        console.log('Filtrando por técnico:', tecnicoFilter);
        
        tickets = tickets.filter(t => {
          const idTecnico = String(t.idUsuarioTecnico);
          const filtroTecnico = String(tecnicoFilter);
          const coincide = idTecnico === filtroTecnico;
          
          console.log(`  Ticket #${t.idTicket}: idUsuarioTecnico=${idTecnico}, filtro=${filtroTecnico}, coincide=${coincide}`);
          
          return coincide;
        });
        
        console.log('Tickets después de filtrar por técnico:', tickets.length);
      }
      
      // Filtrar por rango de fechas
      tickets = tickets.filter(t => {
        const fechaTicket = moment(t.fechaCreacion);
        const enRango = fechaTicket.isBetween(fechaInicio, fechaFin, 'day', '[]');
        
        if (!enRango) {
          console.log(`  Ticket #${t.idTicket} fuera de rango: ${t.fechaCreacion}`);
        }
        
        return enRango;
      });
      
      console.log('Tickets después de filtrar por fecha:', tickets.length);
      
      const eventosFormateados = tickets.map(ticket => {
        console.log('Procesando ticket:', ticket.idTicket, ticket.titulo);
        console.log('Fecha creación:', ticket.fechaCreacion);
        console.log('SLA Resolución:', ticket.SLAMaxResolucion, ticket.sLAMaxResolucion);
        
        const fechaInicio = moment(ticket.fechaCreacion);
        console.log('Fecha inicio parseada:', fechaInicio.format('YYYY-MM-DD'));
        
        let fechaFin;
        if (ticket.fechaCierre) {
          fechaFin = moment(ticket.fechaCierre);
          console.log('Usando fechaCierre:', fechaFin.format('YYYY-MM-DD'));
        } else if (ticket.SLAMaxResolucion || ticket.sLAMaxResolucion) {
          const slaField = ticket.SLAMaxResolucion || ticket.sLAMaxResolucion;
          fechaFin = moment(slaField);
          console.log('Usando SLA Resolución:', slaField, '→', fechaFin.format('YYYY-MM-DD'));
        } else {
          fechaFin = moment(ticket.fechaCreacion).add(24, 'hours');
          console.log('Usando +24h:', fechaFin.format('YYYY-MM-DD'));
        }
        
        const evento = {
          id: ticket.idTicket,
          title: `#${ticket.idTicket} - ${ticket.titulo}`,
          start: fechaInicio.toDate(),
          end: fechaFin.toDate(),
          resource: ticket,
          color: obtenerColorPorPrioridad(ticket.prioridad)
        };
        
        console.log('Evento creado:', evento);
        return evento;
      });
      
      console.log('Eventos formateados:', eventosFormateados);
      console.log('Total eventos:', eventosFormateados.length);
      setEvents(eventosFormateados);
      
    } catch (err) {
      console.error('Error al cargar asignaciones:', err);
      setError('Error al cargar las asignaciones: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const obtenerColorPorPrioridad = (prioridad) => {
    const prioridadLower = prioridad ? prioridad.toLowerCase() : '';
    
    if (prioridadLower.includes('alta') || prioridadLower.includes('critica')) {
      return '#f44336';
    } else if (prioridadLower.includes('media')) {
      return '#ff9800';
    } else if (prioridadLower.includes('baja')) {
      return '#4caf50';
    }
    return '#2196f3';
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleVerDetalle = () => {
    if (selectedEvent) {
      navigate(`/ticket/${selectedEvent.idTicket}`);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CalendarMonthIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Calendario de Asignaciones
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Visualiza y gestiona las asignaciones de tickets por fecha
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {!loading && events.length === 0 && !error && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No hay tickets asignados en el rango de fechas seleccionado. Prueba cambiando el filtro de técnico o navegando a otras fechas.
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filtrar por Técnico</InputLabel>
              <Select
                value={tecnicoFilter}
                label="Filtrar por Técnico"
                onChange={(e) => setTecnicoFilter(e.target.value)}
              >
                <MenuItem value="all">
                  <em>Todos los técnicos</em>
                </MenuItem>
                {tecnicos.map((tecnico) => (
                  <MenuItem key={tecnico.idUsuario} value={tecnico.idUsuario}>
                    {tecnico.nombreCompleto || tecnico.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, newView) => newView && handleViewChange(newView)}
              fullWidth
            >
              <ToggleButton value="month">Mes</ToggleButton>
              <ToggleButton value="week">Semana</ToggleButton>
              <ToggleButton value="day">Día</ToggleButton>
              <ToggleButton value="agenda">Agenda</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ py: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Tickets visibles
                </Typography>
                <Typography variant="h5" color="primary">
                  {events.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          icon={<PriorityHighIcon />}
          label="Alta/Crítica"
          sx={{ bgcolor: '#f44336', color: 'white' }}
        />
        <Chip
          icon={<PriorityHighIcon />}
          label="Media"
          sx={{ bgcolor: '#ff9800', color: 'white' }}
        />
        <Chip
          icon={<PriorityHighIcon />}
          label="Baja"
          sx={{ bgcolor: '#4caf50', color: 'white' }}
        />
      </Box>

      <Paper sx={{ p: 2, height: 600, position: 'relative' }}>
        {loading && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'rgba(255,255,255,0.8)',
              zIndex: 1000
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          view={view}
          date={date}
          messages={messages}
          eventPropGetter={eventStyleGetter}
          popup
        />
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    Ticket #{selectedEvent.idTicket}
                  </Typography>
                  <Chip
                    label={selectedEvent.estado}
                    color="primary"
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent dividers>
              <Typography variant="h6" gutterBottom>
                {selectedEvent.titulo}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedEvent.descripcion}
              </Typography>

              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Técnico Asignado"
                    secondary={selectedEvent.nombreTecnico}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <CategoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Categoría"
                    secondary={selectedEvent.categoria}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <LabelIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Etiqueta"
                    secondary={selectedEvent.etiqueta}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: obtenerColorPorPrioridad(selectedEvent.prioridad) }}>
                      <PriorityHighIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Prioridad"
                    secondary={selectedEvent.prioridad}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AccessTimeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Fecha de Creación"
                    secondary={moment(selectedEvent.fechaCreacion).format('DD/MM/YYYY HH:mm')}
                  />
                </ListItem>

                {selectedEvent.SLAMaxRespuesta && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <AccessTimeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Fecha Límite Respuesta"
                      secondary={moment(selectedEvent.SLAMaxRespuesta).format('DD/MM/YYYY HH:mm')}
                    />
                  </ListItem>
                )}

                {selectedEvent.SLAMaxResolucion && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'error.main' }}>
                        <AccessTimeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Fecha Límite Resolución"
                      secondary={moment(selectedEvent.SLAMaxResolucion).format('DD/MM/YYYY HH:mm')}
                    />
                  </ListItem>
                )}

                {selectedEvent.cumplimientoRespuesta !== undefined && (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: selectedEvent.cumplimientoRespuesta ? 'success.main' : 'error.main' }}>
                        <CheckCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cumplimiento Respuesta"
                      secondary={selectedEvent.cumplimientoRespuesta ? 'A tiempo' : 'Fuera de tiempo'}
                    />
                  </ListItem>
                )}
              </List>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Cerrar
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<VisibilityIcon />}
                onClick={handleVerDetalle}
              >
                Ver Detalles Completos
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}