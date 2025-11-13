import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL + 'login';

class AuthService {
  login(username, password) {
    const url = `${BASE_URL}/auth`;
    console.log('📡 POST login:', url);
    
    return axios.post(url, {
      usuario: username,
      clave: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // 🎭 NUEVOS MÉTODOS PARA ROLES
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.idRol : null;
  }

  getRoleName() {
    const user = this.getCurrentUser();
    return user ? user.descripcionRol : null;
  }

  isAdmin() {
    return this.getUserRole() === 1;
  }

  isTecnico() {
    return this.getUserRole() === 2;
  }

  isUsuario() {
    return this.getUserRole() === 3;
  }

  // Verificar si tiene permiso para una acción
  hasPermission(requiredRole) {
    const userRole = this.getUserRole();
    
    // Administrador tiene acceso a todo
    if (userRole === 1) return true;
    
    // Verificar rol específico
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    
    return userRole === requiredRole;
  }
}

export default new AuthService();