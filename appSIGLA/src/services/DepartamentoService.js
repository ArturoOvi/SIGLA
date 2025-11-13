import axios from "axios";

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + "departamento";

console.log("DEPARTAMENTO_BASE_URL configurada:", BASE_URL);

class DepartamentoService {
  // Obtener todos los departamentos
  getDepartamentos() {
    console.log("GET todos los departamentos:", BASE_URL);
    return axios.get(BASE_URL + "s"); // departamentos (plural)
  }

  // Obtener departamento por ID
  getDepartamento(departamentoId) {
    const url = `${BASE_URL}/${departamentoId}`;
    console.log("GET departamento por ID:", url);
    return axios.get(url);
  }
}

export default new DepartamentoService();