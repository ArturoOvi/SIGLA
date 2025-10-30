import axios from 'axios';

// Base URL desde variable de entorno
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ticket';

console.log('TICKET_BASE_URL configurada:', BASE_URL);

class TicketService {
  // Obtener todos los tickets
  getTickets() {
    console.log('GET todos los tickets:', BASE_URL);
    return axios.get(BASE_URL);
  }

  // Obtener ticket por ID
  getTicket(ticketId) {
    const url = `${BASE_URL}/${ticketId}`;
    console.log('GET ticket por ID:', url);
    return axios.get(url);
  }

  // Obtener tickets por usuario solicitante
  getTicketsByUser(userId) {
    const url = `${BASE_URL}/ticketsByUsuario/${userId}`;
    console.log('GET tickets por usuario:', url);
    return axios.get(url);
  }

  // Obtener tickets asignados a técnico
  getTicketsByTechnician(technicianId) {
    const url = `${BASE_URL}/ticketsByTecnico/${technicianId}`;
    console.log('GET tickets por técnico:', url);
    return axios.get(url);
  }

  // Obtener tickets por estado
  getTicketsByStatus(statusId) {
    const url = `${BASE_URL}/ticketsByEstado/${statusId}`;
    console.log('GET tickets por estado:', url);
    return axios.get(url);
  }

  // Obtener tickets para el calendario con filtros
  getTicketsCalendario(params = {}) {
    const { idTecnico, fechaInicio, fechaFin} = params;
    
    // Construir query params
    let queryParams = [];
    if (idTecnico && idTecnico !== 'all') {
      queryParams.push(`idTecnico=${idTecnico}`);
    }
    if (fechaInicio) {
      queryParams.push(`fechaInicio=${fechaInicio}`);
    }
    if (fechaFin) {
      queryParams.push(`fechaFin=${fechaFin}`);
    }
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const url = `${BASE_URL}/ticketsCalendario${queryString}`;
    
    console.log('GET tickets calendario:', url);
    return axios.get(url);
  }

  // Crear nuevo ticket
  createTicket(ticket) {
    console.log('POST crear ticket:', BASE_URL, ticket);
    return axios.post(BASE_URL, ticket, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Actualizar ticket
  updateTicket(ticket) {
    console.log('PUT actualizar ticket:', BASE_URL, ticket);
    return axios.put(BASE_URL, ticket, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Eliminar ticket
  deleteTicket(ticketId) {
    const url = `${BASE_URL}/${ticketId}`;
    console.log('DELETE ticket:', url);
    return axios.delete(url);
  }

  // Cerrar ticket (si tienes este endpoint)
  closeTicket(ticketId) {
    const url = `${BASE_URL}/close/${ticketId}`;
    console.log('PUT cerrar ticket:', url);
    return axios.put(url);
  }

  // Asignar ticket a técnico
  assignTicket(ticketId, technicianId) {
    const url = `${BASE_URL}/assign`;
    console.log('PUT asignar ticket:', url);
    return axios.put(url, {
      ticketId,
      technicianId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Cambiar estado de ticket
  changeStatus(ticketId, statusId) {
    const url = `${BASE_URL}/changeStatus`;
    console.log('PUT cambiar estado ticket:', url);
    return axios.put(url, {
      ticketId,
      statusId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Obtener estadísticas de tickets
  getTicketStats() {
    const url = `${BASE_URL}/stats`;
    console.log('GET estadísticas de tickets:', url);
    return axios.get(url);
  }

  // Obtener estadísticas por técnico
  getTicketStatsByTechnician(technicianId) {
    const url = `${BASE_URL}/stats/tecnico/${technicianId}`;
    console.log('GET estadísticas por técnico:', url);
    return axios.get(url);
  }

  // Obtener estadísticas por categoría
  getTicketStatsByCategory(categoryId) {
    const url = `${BASE_URL}/stats/categoria/${categoryId}`;
    console.log('GET estadísticas por categoría:', url);
    return axios.get(url);
  }
}

export default new TicketService();