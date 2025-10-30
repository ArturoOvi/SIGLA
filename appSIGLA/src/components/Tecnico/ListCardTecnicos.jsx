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
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import InfoIcon from '@mui/icons-material/Info';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BadgeIcon from '@mui/icons-material/Badge';

ListCardTecnicos.propTypes = {
  data: PropTypes.array.isRequired,
};

export function ListCardTecnicos({ data }) {
  if (!Array.isArray(data)) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        No se pudo cargar la lista de técnicos. El formato de datos no es válido.
      </Typography>
    );
  }

  const getEstadoLabel = (estado) => {
    return estado === '1' || estado === 1 ? 'Activo' : 'Inactivo';
  };

  const getEstadoColor = (estado) => {
    return estado === '1' || estado === 1 ? 'success' : 'error';
  };

  const formatCedula = (cedula) => {
    if (!cedula) return 'Sin cédula';
    // Formato: 1-2345-6789
    const str = String(cedula);
    if (str.length === 9) {
      return `${str.slice(0, 1)}-${str.slice(1, 5)}-${str.slice(5)}`;
    }
    return cedula;
  };

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data.map((tecnico, index) => (
        <Grid item xs={12} sm={6} md={4} key={tecnico.idTecnico || tecnico.id || index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              sx={{
                p: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
              }}
              avatar={
                <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                  <EngineeringIcon />
                </Avatar>
              }
              title={
                <Typography variant="h6" component="div">
                  {tecnico.nombreCompleto || 'Sin nombre'}
                </Typography>
              }
              subheader={
                <Chip 
                  label={getEstadoLabel(tecnico.estado)}
                  color={getEstadoColor(tecnico.estado)}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              }
            />
            
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                <BadgeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                <strong>Cédula:</strong> {formatCedula(tecnico.idUsuario)}
              </Typography>

              {tecnico.email && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {tecnico.email}
                </Typography>
              )}

              {tecnico.telefono && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Teléfono:</strong> {tecnico.telefono}
                </Typography>
              )}

              {tecnico.especialidad && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Especialidad:</strong> {tecnico.especialidad}
                </Typography>
              )}

              {tecnico.ticketsAsignados !== undefined && (
                <Typography variant="body2" color="primary" sx={{ mt: 1.5, fontWeight: 'bold' }}>
                  Tickets asignados: {tecnico.ticketsAsignados}
                </Typography>
              )}
            </CardContent>

            <CardActions
              disableSpacing
              sx={{
                backgroundColor: (theme) => theme.palette.grey[100],
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                component={Link}
                to={`/tecnico/${tecnico.idUsuario}`}
                aria-label="Ver detalle"
                color="primary"
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