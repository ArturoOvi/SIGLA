import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListTickets } from "./components/Ticket/ListTickets";
import { DetailTicket } from "./components/Ticket/DetailTicket";
import { ListTecnicos } from "./components/Tecnico/ListTecnico";
import { DetailTecnico } from "./components/Tecnico/DetailTecnico";
import DetalleCategoria from "./components/Categoria/DetalleCategoria";
import { ListCategorias } from "./components/Categoria/ListCategorias";
import { CalendarAsignaciones } from "./components/Calendar/CalendarAsignaciones";
import { Login } from "./components/login/Login.jsx";  // 👈 Cambio aquí
import { ProtectedRoute } from "./components/login/ProtectedRoute.jsx";  // 👈 Cambio aquí
import AuthService from "./services/AuthService";
import ListUsuario from "./components/Usuario/ListUsuario";
import DetailUsuario from "./components/Usuario/DetailUsuario";
import { CreateUsuario } from "./components/Usuario/CreateUsuario";

import 'react-big-calendar/lib/css/react-big-calendar.css';

function RootRedirect() {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

const rutas = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        path: "/home",
        element: <Home />,
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
      },
        {
        path: "/usuarios",
        element: <ListUsuario />,
      },
      {
        path: "/usuarios/nuevo",  
        element: <CreateUsuario />,
      },
      {
        path: "/usuario/:id",
        element: <DetailUsuario />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>
);