import axios from "axios";

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + "puesto";

console.log("PUESTO_BASE_URL configurada:", BASE_URL);

class PuestoService {
  // Obtener todos los puestos
  getPuestos() {
    console.log("GET todos los puestos:", BASE_URL);
    return axios.get(BASE_URL + "s"); // puestos (plural)
  }

  // Obtener puesto por ID
  getPuesto(puestoId) {
    const url = `${BASE_URL}/${puestoId}`;
    console.log("GET puesto por ID:", url);
    return axios.get(url);
  }
}

export default new PuestoService();