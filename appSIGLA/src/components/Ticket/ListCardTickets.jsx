import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';

ListCardTickets.propTypes = {
  data: PropTypes.array.isRequired,
};

export function ListCardTickets({ data }) {
  if (!Array.isArray(data)) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        No se pudo cargar la lista de tickets. El formato de datos no es válido.
      </Typography>
    );
  }

  const formatFecha = (fecha) => {
    if (!fecha || fecha === '0000-00-00') return 'Sin fecha';
    const date = new Date(fecha);
    return isNaN(date.getTime()) ? 'Fecha inválida' : date.toLocaleDateString('es-ES');
  };

  /*const getEstadoNombre = (idEstado) => {
    const estados = {
      '1': 'Pendiente',
      '2': 'En progreso',
      '3': 'Resuelto',
      '4': 'Cancelado',
    };
    return estados[String(idEstado)] || 'Desconocido';
  };*/

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data.map((ticket) => (
        <Grid item xs={12} sm={6} md={4} key={ticket.idTicket}>
          <Card>
            <CardHeader
              sx={{
                p: 1,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
                '& .MuiCardHeader-subheader': {
                  color: (theme) => theme.palette.common.white,
                },
              }}
              title={ticket.titulo || 'Sin título'}
              subheader={`Estado: ${ticket.estado || 'Sin estado'}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <AccessTimeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> 
                Creado: {formatFecha(ticket.fechaCreacion)}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Solicitante:</strong> {ticket.nombreCliente || 'No asignado'}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                <strong>Técnico:</strong> { ticket.nombreTecnico|| 'No asignado'}
              </Typography>
            </CardContent>

            <CardActions
              disableSpacing
              sx={{
                backgroundColor: (theme) => theme.palette.grey[100],
              }}
            >
              <IconButton
                component={Link}
                to={`/ticket/${ticket.idTicket}`}
                aria-label="Detalle"
                color="primary"
                sx={{ ml: 'auto' }}
              >
                <InfoIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
