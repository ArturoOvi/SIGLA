import axios from "axios";

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + "rol";

console.log("ROL_BASE_URL configurada:", BASE_URL);

class RolService {
  // Obtener todos los roles
  getRoles() {
    console.log("GET todos los roles:", BASE_URL);
    return axios.get(BASE_URL + "es"); // roles (plural)
  }

  // Obtener rol por ID
  getRol(rolId) {
    const url = `${BASE_URL}/${rolId}`;
    console.log("GET rol por ID:", url);
    return axios.get(url);
  }
}

export default new RolService();