import axios from 'axios';

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + 'categoria';


console.log('CATEGORIA_BASE_URL configurada:', BASE_URL);

class CategoriaService {
  // Obtener todas las categorías
  getCategorias() {
    console.log('GET todas las categorías:', BASE_URL);
    return axios.get(BASE_URL);
  }
  

  // Obtener categoría por ID
  getCategoria(idcategoria) {
    const url = `${BASE_URL}/${idcategoria}`;
    console.log('GET categoría por ID:', url);
    console.log("Consultando:", `${BASE_URL}/${idcategoria}`);
    return axios.get(url);
  }

  // Crear nueva categoría
  createCategoria(categoria) {
    console.log('POST crear categoría:', BASE_URL, categoria);
    return axios.post(BASE_URL, categoria, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Actualizar categoría
  updateCategoria(categoria) {
    console.log('PUT actualizar categoría:', BASE_URL, categoria);
    return axios.put(BASE_URL, categoria, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Eliminar categoría
  deleteCategoria(categoriaId) {
    const url = `${BASE_URL}/${categoriaId}`;
    console.log('DELETE categoría:', url);
    return axios.delete(url);
  }

  // Obtener etiquetas de una categoría
  getEtiquetasCategoria(categoriaId) {
    const url = `${BASE_URL}/${categoriaId}/etiquetas`;
    console.log('GET etiquetas de categoría:', url);
    return axios.get(url);
  }

  // Obtener tickets por categoría
  getTicketsByCategoria(categoriaId) {
    const url = `${BASE_URL}/${categoriaId}/tickets`;
    console.log('GET tickets por categoría:', url);
    return axios.get(url);
  }

  // Obtener estadísticas de categoría
  getCategoriaStats(categoriaId) {
    const url = `${BASE_URL}/${categoriaId}/stats`;
    console.log('GET estadísticas de categoría:', url);
    return axios.get(url);
  }
}


export default new CategoriaService();