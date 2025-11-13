import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';
import AuthService from '../../services/AuthService';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); 
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.username || !formData.password) {
    setError('Por favor complete todos los campos');
    return;
  }

  try {
    setLoading(true);
    setError('');

    console.log('🔐 Intentando login:', formData.username);
    
    const response = await AuthService.login(formData.username, formData.password);
    
    console.log('✅ Login exitoso:', response.data);

    // Tu backend devuelve { success: true, usuario: {...} }
    if (response.data.success) {
      // Guardar datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      localStorage.setItem('token', 'dummy-token'); // Tu backend no devuelve token aún
      localStorage.setItem('isAuthenticated', 'true');

      // Redirigir al home
      navigate('/home');
    } else {
      setError(response.data.message || 'Error al iniciar sesión');
    }
    
  } catch (err) {
    console.error('❌ Error en login:', err);
    
    if (err.response) {
      // Error de respuesta del servidor
      setError(err.response.data.message || 'Usuario o contraseña incorrectos');
    } else if (err.request) {
      // Error de red
      setError('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Otro tipo de error
      setError('Error al iniciar sesión. Intenta nuevamente.');
    }
  } finally {
    setLoading(false);
  }
};

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3
          }}
        >
          {/* Logo o título */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>

          <Typography component="h1" variant="h4" gutterBottom fontWeight="bold">
            SIGLA
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sistema de Gestión de Tickets
          </Typography>

          {/* Mostrar error si existe */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Formulario */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario o Cédula"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>

            {/* Links adicionales */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ¿Olvidaste tu contraseña?{' '}
                <a href="/recuperar-password" style={{ color: '#667eea' }}>
                  Recuperar
                </a>
              </Typography>
            </Box>
          </Box>

          {/* Versión */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
            Versión 1.0.0 - {new Date().getFullYear()}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}