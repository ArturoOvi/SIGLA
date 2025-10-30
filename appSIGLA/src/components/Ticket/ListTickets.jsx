import React, { useEffect, useState } from 'react';
import TicketService from '../../services/TicketService';
import { ListCardTickets } from './ListCardTickets';
import { CircularProgress, Box, Alert } from '@mui/material';

export function ListTickets() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Llamar al API y obtener TODOS los tickets
  useEffect(() => {
    console.log('Obteniendo todos los tickets...');
    
    TicketService.getTickets()
      .then((response) => {
        console.log('Respuesta exitosa:', response);
        console.log('Data:', response.data);
        
        const resultado = response.data;

        if (!resultado) {
          setError('No se encontraron tickets');
          setLoaded(true);
          return;
        }

        const tickets = Array.isArray(resultado) ? resultado : [resultado];
        console.log('✅ Total de tickets:', tickets.length);

        setData(tickets);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error completo:', error);
        console.error('Error.response:', error.response);
        setError(error.response?.data || error.message || 'Error desconocido');
        setLoaded(true);
      });
  }, []); 

  if (!loaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No hay tickets disponibles</Alert>
      </Box>
    );
  }

  return <ListCardTickets data={data} />;
}