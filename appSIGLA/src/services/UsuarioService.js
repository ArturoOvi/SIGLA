import axios from "axios";

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + "usuario";

console.log("USUARIO_BASE_URL configurada:", BASE_URL);

class UsuarioService {
  // Obtener todos los usuarios
  getUsuarios() {
    console.log("GET todos los usuarios:", BASE_URL);
    return axios.get(BASE_URL);
  }

  // Obtener usuario por ID
  getUsuario(usuarioId) {
    const url = `${BASE_URL}/${usuarioId}`;
    console.log("GET usuario por ID:", url);
    return axios.get(url);
  }

  // Obtener usuarios por rol
  getUsuariosPorRol(idRol) {
    const url = `${BASE_URL}/rol/${idRol}`;
    console.log("GET usuarios por rol:", url);
    return axios.get(url);
  }

  // Crear nuevo usuario
  createUsuario(usuario) {
    console.log("POST crear usuario:", BASE_URL, usuario);
    return axios.post(BASE_URL, usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Actualizar usuario
  updateUsuario(usuarioId, usuario) {
    const url = `${BASE_URL}/${usuarioId}`;
    console.log("PUT actualizar usuario:", url, usuario);
    return axios.put(url, usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Eliminar usuario
  deleteUsuario(usuarioId) {
    const url = `${BASE_URL}/${usuarioId}`;
    console.log("DELETE usuario:", url);
    return axios.delete(url);
  }
}

export default new UsuarioService();
