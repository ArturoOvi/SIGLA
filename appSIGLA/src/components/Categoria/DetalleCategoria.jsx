import { useState, useEffect, useCallback } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoriaService from '../../services/CategoriaService';
import { VistaDetalleCategoria } from './VistaDetalleCategoria';

export default function DetalleCategoria() {
  const { idCategoria } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaDetalle, setCategoriaDetalle] = useState(null);
  console.log("DetalleCategoria montado con ID:", idCategoria);

  const procesarDatosCategoria = (datos) => {
    if (!Array.isArray(datos)) {
      datos = [datos]; // Lo convertimos en array
    }
    
    if (datos.length === 0) {
      return null;
    }

    const primerRegistro = datos[0];
    
    const categoria = {
      idCategoria: primerRegistro.idcategoria,
      nombre: primerRegistro.nombre,
      cantidadEtiquetas: 0,
      etiquetas: []
    };

    const etiquetasMap = new Map();

    datos.forEach(registro => {
      if (registro.idEtiqueta) {
        const key = registro.idEtiqueta;
        
        if (!etiquetasMap.has(key)) {
          etiquetasMap.set(key, {
            idEtiqueta: registro.idEtiqueta,
            nombre: registro.etiqueta,
            idSLA: registro.idSLA,
            descripcionSLA: registro.descripcionSLA,
            tiempoMaximoResolucion: registro.tiempoMaximoResolucion,
            tiempoMaximoRepuesta: registro.tiempoMaximoRepuesta
          });
        }
      }
    });

    categoria.etiquetas = Array.from(etiquetasMap.values());
    categoria.cantidadEtiquetas = categoria.etiquetas.length;

    return categoria;
  };

  const obtenerDetalleCategoria = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Obteniendo detalle de categoría:', idCategoria);

      const response = await CategoriaService.getCategoria(idCategoria);
      
      console.log('Datos recibidos:', response.data);
      
      const datosAgrupados = procesarDatosCategoria(response.data);
      
      setCategoriaDetalle(datosAgrupados);

    } catch (err) {
      console.error('Error al obtener categoría:', err);
      setError(err.response?.data?.message || 'Error al cargar los datos de la categoría');
    } finally {
      setLoading(false);
    }
  }, [idCategoria]);

  //Ahora incluye obtenerDetalleCategoria en las dependencias
  useEffect(() => {
    obtenerDetalleCategoria();
  }, [obtenerDetalleCategoria]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!categoriaDetalle) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Alert severity="warning">No se encontró la categoría</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          color="primary"
          sx={{ 
            '&:hover': { 
              backgroundColor: 'primary.light',
              color: 'white'
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <VistaDetalleCategoria data={categoriaDetalle} />
    </Container>
  );
}