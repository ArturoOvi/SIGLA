import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export function ProtectedRoute({ children }) {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
}
