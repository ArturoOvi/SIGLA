import React, { useState, useEffect } from 'react'; 

import TicketService from '../../services/TicketService'; 

import { ListCardTickets } from './ListCardTickets'; 

 

export function CatalogTickets() { 

  // Resultado del API 

  const [data, setData] = useState(null); 

  // Error del API 

  const [error, setError] = useState(''); 

  // Estado de carga 

  const [loaded, setLoaded] = useState(false); 

 

  // Llamar al API y obtener la lista de tickets 

  useEffect(() => { 

    TicketService.getTickets() 

      .then((response) => { 

        console.log(response); 

        setData(response.data); 

        setError(''); 

        setLoaded(true); 

      }) 

      .catch((error) => { 

        console.error(error); 

        setError(error.message || 'Error desconocido'); 

        setLoaded(false); 

      }); 

  }, []); 

 

  if (!loaded) return <p>Cargando...</p>; 

  if (error) return <p>Error: {error}</p>; 

 

  return <>{data && <ListCardTickets data={data} />}</>; 

} 