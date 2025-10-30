import React, { useState, useEffect } from 'react';
import CategoriaService from '../../services/CategoriaService';
import { ListCardCategorias } from './ListCardCategorias';
import { CircularProgress, Box, Alert, Typography } from '@mui/material';

export function ListCategorias() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Obteniendo lista de categorías...');
    
    CategoriaService.getCategorias()
      .then((response) => {
        console.log('Respuesta de categorías:', response);
        console.log('Data:', response.data);
        
        const resultado = response.data;

        if (!resultado) {
          setError('No se encontraron categorías');
          setLoaded(true);
          return;
        }

        const categorias = Array.isArray(resultado) ? resultado : [resultado];
        console.log('Total de categorías:', categorias.length);

        setData(categorias);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
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
          <Typography variant="h6">Error al cargar categorías</Typography>
          <Typography variant="body2">{error}</Typography>
        </Alert>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">
          <Typography variant="h6">No hay categorías disponibles</Typography>
          <Typography variant="body2">
            No se encontraron categorías en el sistema.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Categorías
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: {data.length} {data.length === 1 ? 'categoría' : 'categorías'}
        </Typography>
      </Box>
      <ListCardCategorias data={data} />
    </Box>
  );
}