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

import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import UsuarioService from '../../services/UsuarioService';

const DetailUsuario = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('Cargando usuario ID:', routeParams.id);
    
    UsuarioService.getUsuario(routeParams.id)
      .then((response) => {
        console.log('Datos del usuario:', response.data);
        setData(response.data);
        setError('');
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error al cargar usuario:', error);
        setError(error.message || 'Error al cargar el usuario');
        setLoaded(true);
      });
  }, [routeParams.id]);

  const handleEliminar = async () => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        await UsuarioService.deleteUsuario(routeParams.id);
        navigate('/usuarios');
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        alert('Error al eliminar el usuario');
      }
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₡0.00';
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC'
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return 'No especificada';
    return new Date(date).toLocaleDateString('es-CR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEstadoLabel = (estado) => {
    const estadoStr = String(estado).toLowerCase();
    return estadoStr === 'activo' || estadoStr === '1' ? 'Activo' : 'Inactivo';
  };

  const getEstadoColor = (estado) => {
    const estadoStr = String(estado).toLowerCase();
    return estadoStr === 'activo' || estadoStr === '1' ? 'success' : 'error';
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
          onClick={() => navigate('/usuarios')}
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
        <Alert severity="info">No se encontró el usuario</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/usuarios')}
          sx={{ mt: 2 }}
        >
          Volver a la lista
        </Button>
      </Container>
    );
  }

  return (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      {/* Botones de navegación */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/usuarios')}
        >
          Volver a la lista
        </Button>
        <Button 
          startIcon={<EditIcon />} 
          onClick={() => navigate(`/usuarios/editar/${routeParams.id}`)}
          variant="contained"
          color="success"
        >
          Editar
        </Button>
        <Button 
          startIcon={<DeleteIcon />} 
          onClick={handleEliminar}
          variant="contained"
          color="error"
        >
          Eliminar
        </Button>
      </Box>

      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          {/* Encabezado del Usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                mr: 2,
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              {data.nombre?.charAt(0).toUpperCase()}
              {data.apellido1?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {data.nombre} {data.apellido1} {data.apellido2}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Usuario #{data.idUsuario}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={getEstadoLabel(data.estado)}
                  color={getEstadoColor(data.estado)}
                  icon={getEstadoLabel(data.estado) === 'Activo' ? <CheckCircleIcon /> : <CancelIcon />}
                  size="small"
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Grid Principal */}
          <Grid container spacing={3}>
            {/* Columna Izquierda - Información Personal */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                Información Personal
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <BadgeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="ID Usuario" 
                    secondary={data.idUsuario}
                  />
                </ListItem>

                {data.correo && (
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Correo Electrónico" 
                      secondary={data.correo}
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

                {data.direccion && (
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Dirección" 
                      secondary={data.direccion}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>

            {/* Columna Derecha - Información Laboral */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WorkIcon color="primary" />
                Información Laboral
              </Typography>

              <List>
                {data.nombreDepartamento && (
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Departamento" 
                      secondary={data.nombreDepartamento}
                    />
                  </ListItem>
                )}

                {data.nombrePuesto && (
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Puesto" 
                      secondary={data.nombrePuesto}
                    />
                  </ListItem>
                )}

                {data.nombreRol && (
                  <ListItem>
                    <ListItemIcon>
                      <AdminPanelSettingsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Rol" 
                      secondary={
                        <Chip 
                          label={data.nombreRol} 
                          color="primary" 
                          size="small" 
                          sx={{ mt: 0.5 }}
                        />
                      }
                    />
                  </ListItem>
                )}

                {data.fechaIngreso && (
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Fecha de Ingreso" 
                      secondary={formatDate(data.fechaIngreso)}
                    />
                  </ListItem>
                )}
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Información Financiera */}
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoneyIcon color="primary" />
            Información Financiera
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoneyIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">
                    Salario
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(data.salario)}
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'info.light', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BeachAccessIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">
                    Saldo de Vacaciones
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {data.saldoVacaciones || 0} días
                </Typography>
              </Card>
            </Grid>

            {data.numerodeCuenta && (
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined" sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccountBalanceIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">
                      Número de Cuenta
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {data.numerodeCuenta}
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>

          {/* IDs de Referencia (Sistema) */}
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom color="text.secondary">
            🔢 IDs de Referencia (Sistema)
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">
                ID Usuario
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {data.idUsuario}
              </Typography>
            </Grid>
            {data.idDepartamento && (
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">
                  ID Departamento
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {data.idDepartamento}
                </Typography>
              </Grid>
            )}
            {data.idPuesto && (
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">
                  ID Puesto
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {data.idPuesto}
                </Typography>
              </Grid>
            )}
            {data.idRol && (
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">
                  ID Rol
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {data.idRol}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailUsuario;