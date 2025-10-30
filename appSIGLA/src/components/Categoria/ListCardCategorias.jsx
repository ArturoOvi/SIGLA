import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import LabelIcon from '@mui/icons-material/Label';
import InfoIcon from '@mui/icons-material/Info';

ListCardCategorias.propTypes = {
  data: PropTypes.array.isRequired,
};

export function ListCardCategorias({ data }) {
  if (!Array.isArray(data)) {
    return (
      <Typography variant="body1" sx={{ p: 2 }}>
        No se pudo cargar la lista de categorías. El formato de datos no es válido.
      </Typography>
    );
  }

  const getCategoriaColor = (index) => {
    const colores = ['primary', 'secondary', 'success', 'warning', 'info', 'error'];
    return colores[index % colores.length];
  };

  return (
    <Grid container sx={{ p: 2 }} spacing={3}>
      {data.map((categoria, index) => (
        <Grid item xs={12} sm={6} md={4} key={categoria.idcategoria || index}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
              sx={{
                p: 2,
                backgroundColor: (theme) => theme.palette[getCategoriaColor(index)].main,
                color: (theme) => theme.palette.common.white,
              }}
              avatar={
                <Avatar sx={{ bgcolor: 'white', color: `${getCategoriaColor(index)}.main` }}>
                  <CategoryIcon />
                </Avatar>
              }
              title={
                <Typography variant="h6" component="div">
                  {categoria.nombre || 'Sin nombre'}
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  ID: {categoria.idcategoria || 'Sin Categoria'}
                </Typography>
              }
            />

            <CardContent sx={{ flexGrow: 1 }}>
              {categoria.cantidadEtiquetas && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LabelIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Cantidad Etiquetas:</strong> {categoria.cantidadEtiquetas}
                  </Typography>
                </Box>
              )}
            </CardContent>

            <CardActions disableSpacing>
              <IconButton
                component={Link}
                to={`/categoria/${categoria.idcategoria}`}
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