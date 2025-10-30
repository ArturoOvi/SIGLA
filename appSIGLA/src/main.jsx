import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { RouterProvider } from "react-router";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListTickets } from "./components/Ticket/ListTickets";
import { DetailTicket } from "./components/Ticket/DetailTicket";
import { ListTecnicos } from "./components/Tecnico/ListTecnico";
import { DetailTecnico } from "./components/Tecnico/DetailTecnico";
import DetalleCategoria from "./components/Categoria/DetalleCategoria";
import { ListCategorias } from "./components/Categoria/ListCategorias";
import { CalendarAsignaciones } from "./components/Calendar/CalendarAsignaciones";

const rutas = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/tickets",
        element: <ListTickets />,
      },
      {
        path: "/ticket/:id",
        element: <DetailTicket />,
      },
      {
        path: "/tecnicos",
        element: <ListTecnicos />,
      },
      {
        path: "/tecnico/:id",
        element: <DetailTecnico />,
      },
      {
        path: "/categorias",
        element: <ListCategorias />
      },
      {
        path: "/categoria/:idCategoria",
        element: <DetalleCategoria />
      },
      {
        path: "/calendario",
        element: <CalendarAsignaciones />
      } 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>
);