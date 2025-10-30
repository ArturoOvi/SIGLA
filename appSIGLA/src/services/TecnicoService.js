import axios from 'axios';

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + 'tecnico';

console.log('TECNICO_BASE_URL configurada:', BASE_URL);

class TecnicoService {
  // Obtener todos los técnicos
  getTecnicos() {
    console.log('GET todos los técnicos:', BASE_URL);
    return axios.get(BASE_URL);
  }

  // Obtener técnico por ID
  getTecnico(tecnicoId) {
    const url = `${BASE_URL}/${tecnicoId}`;
    console.log('GET técnico por ID:', url);
    return axios.get(url);
  }

  // Crear nuevo técnico
  createTecnico(tecnico) {
    console.log('POST crear técnico:', BASE_URL, tecnico);
    return axios.post(BASE_URL, tecnico, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Actualizar técnico
  updateTecnico(tecnico) {
    console.log('PUT actualizar técnico:', BASE_URL, tecnico);
    return axios.put(BASE_URL, tecnico, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Eliminar técnico
  deleteTecnico(tecnicoId) {
    const url = `${BASE_URL}/${tecnicoId}`;
    console.log('DELETE técnico:', url);
    return axios.delete(url);
  }

  // Obtener estadísticas de técnico
  getTecnicoStats(tecnicoId) {
    const url = `${BASE_URL}/${tecnicoId}/stats`;
    console.log('GET estadísticas de técnico:', url);
    return axios.get(url);
  }

  // Obtener carga de trabajo de técnicos
  getTecnicosWorkload() {
    const url = `${BASE_URL}/workload`;
    console.log('GET carga de trabajo de técnicos:', url);
    return axios.get(url);
  }

  // Buscar técnicos activos
  getActiveTecnicos() {
    const url = `${BASE_URL}/active`;
    console.log('GET técnicos activos:', url);
    return axios.get(url);
  }

  // Buscar técnicos disponibles
  getAvailableTecnicos() {
    const url = `${BASE_URL}/available`;
    console.log('GET técnicos disponibles:', url);
    return axios.get(url);
  }
}

export default new TecnicoService();