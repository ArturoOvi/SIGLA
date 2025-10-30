import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function Home() {
  return (
    <Container sx={{ p: 2 }} maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Sistema de Gestion Laboral
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary">
        Bienvenido al Sistema de Gestión Laboral. Aquí puedes administrar y supervisar tus beneficios laborales de manera eficiente.
      </Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        <img
          src="/src/assets/logo.jpg" 
          alt="Imagen descriptiva"
          style={{ maxWidth: "50%", height: "auto", borderRadius: "8px" }}
        />
      </Box>
    </Container>
  );
}
