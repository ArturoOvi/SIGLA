import React, { useState, useEffect } from 'react';
import TecnicoService from '../../services/TecnicoService';
import { ListCardTecnicos } from './ListCardTecnicos'; 
import { CircularProgress, Box, Alert, Typography } from '@mui/material';

export function ListTecnicos() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Obteniendo lista de técnicos...');
    
    TecnicoService.getTecnicos()
      .then((response) => {
        console.log('Respuesta de técnicos:', response);
        console.log('Data:', response.data);
        
        const resultado = response.data;

        if (!resultado) {
          setError('No se encontraron técnicos');
          setLoaded(true);
          return;
        }

        const tecnicos = Array.isArray(resultado) ? resultado : [resultado];
        console.log('✅ Total de técnicos:', tecnicos.length);

        setData(tecnicos);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error al obtener técnicos:', error);
        console.error('Error.response:', error.response);
        setError(error.response?.data?.message || error.message || 'Error desconocido');
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
        <Alert severity="error">
          <Typography variant="h6">Error al cargar técnicos</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">
          <Typography variant="h6">No hay técnicos disponibles</Typography>
          <Typography variant="body2">
            No se encontraron técnicos en el sistema.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Técnicos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {data.length} {data.length === 1 ? 'técnico' : 'técnicos'}
        </Typography>
      </Box>
      <ListCardTecnicos data={data} />
    </Box>
  );
}