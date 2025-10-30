-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sigla
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionCategoria` varchar(150) NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Solicitud de Vacaciones'),(2,'Actualización de datos '),(3,'Certificados y constancias '),(4,'Consulta de beneficios ');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `idcomentario` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(250) NOT NULL,
  `idTicket` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  PRIMARY KEY (`idcomentario`),
  KEY `fk_Comentario_Ticket_idx` (`idTicket`),
  KEY `fk_Comentario_Rol_idx` (`idRol`),
  CONSTRAINT `fk_Comentario_Rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_Ticket` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombreDepartamento` varchar(150) NOT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Direccion General'),(2,'Administracion y Finanzas'),(3,'Recursos Humanos'),(4,'Comercial'),(5,'Tecnologia y Desarrollo'),(6,'Operaciones'),(7,'Legal');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `idEstado` int(11) NOT NULL,
  `nombreEstado` varchar(150) NOT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Pendiente'),(2,'Asignado'),(3,'En Proceso'),(4,'Resuelto'),(5,'Cerrado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `idEtiqueta` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionCategoria` varchar(45) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  PRIMARY KEY (`idEtiqueta`),
  KEY `fk_Etiqueta_Categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_Etiqueta_Categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (1,'Solicitud de vacaciones anuales ',1),(2,'Solicitud de días por temas personales',1),(3,'Solicitud de permiso especial',1),(4,'Solicitud por acomulación de días',1),(5,'Cambio de Dirección',2),(6,'Datos Bancarios ',2),(7,'Actualización de ',2),(8,'Constancia de ',3),(9,'Carta de ',3),(10,'Certificado de ',3),(11,'Pago incorrecto',4),(12,'Deducciones ',4),(13,'Aguinaldo ',4),(14,'Seguro Medico ',4),(15,'Pensión ',4);
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial ticket`
--

DROP TABLE IF EXISTS `historial ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial ticket` (
  `idHistorial Ticket` int(11) NOT NULL,
  `idTicket` int(11) NOT NULL,
  `idComentarios` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idImagen` int(11) NOT NULL,
  `idResponsable` int(11) NOT NULL,
  `idEstado` int(11) NOT NULL,
  PRIMARY KEY (`idHistorial Ticket`),
  KEY `fk_HistorialTicket_Ticket_idx` (`idTicket`),
  KEY `fk_HistorialTicket_Comentarios_idx` (`idComentarios`),
  KEY `fk_HistorialTicket_Imagenes_idx` (`idImagen`),
  KEY `fk_HistorialTicket_Responsable_idx` (`idResponsable`),
  KEY `fk_HistorialTicket_Estado_idx` (`idEstado`),
  CONSTRAINT `fk_HistorialTicket_Comentarios` FOREIGN KEY (`idComentarios`) REFERENCES `comentario` (`idcomentario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialTicket_Estado` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialTicket_Imagenes` FOREIGN KEY (`idImagen`) REFERENCES `imagenes` (`idimagenes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialTicket_Responsable` FOREIGN KEY (`idResponsable`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialTicket_Ticket` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial ticket`
--

LOCK TABLES `historial ticket` WRITE;
/*!40000 ALTER TABLE `historial ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialacademico`
--

DROP TABLE IF EXISTS `historialacademico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialacademico` (
  `idHistorialAcademico` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `gradoAcademico` varchar(145) NOT NULL,
  `intitucion` varchar(145) NOT NULL,
  `fechaObtencion` varchar(145) NOT NULL,
  PRIMARY KEY (`idHistorialAcademico`),
  KEY `fk_HistorialAcademico_Usuario_idx` (`idUsuario`),
  CONSTRAINT `fk_HistorialAcademico_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialacademico`
--

LOCK TABLES `historialacademico` WRITE;
/*!40000 ALTER TABLE `historialacademico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialacademico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialcolaborador`
--

DROP TABLE IF EXISTS `historialcolaborador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialcolaborador` (
  `idHistorialColaborador` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `salarioAnterior` float NOT NULL,
  `salarioNuevo` float NOT NULL,
  `idDepartamentoAnterior` int(11) NOT NULL,
  `idNuevoDepartamento` int(11) NOT NULL,
  `idPuestoAnterior` int(11) NOT NULL,
  `idNuevoPuesto` int(11) NOT NULL,
  `fechaActualizacion` date NOT NULL,
  PRIMARY KEY (`idHistorialColaborador`),
  KEY `fk_HistorialColaborador_Usuario_idx` (`idUsuario`),
  KEY `fk_HistorialColaborador_NuevoPuesto_idx` (`idNuevoPuesto`),
  KEY `fk_HistorialColaborador_NuevoDepartamento_idx` (`idNuevoDepartamento`),
  KEY `fk_HistorialColaborador_DepartamentoAnterior_idx` (`idDepartamentoAnterior`),
  KEY `fkfk_HistorialColaborador_PuestoAnterior_idx` (`idPuestoAnterior`),
  CONSTRAINT `fk_HistorialColaborador_DepartamentoAnterior` FOREIGN KEY (`idDepartamentoAnterior`) REFERENCES `puesto` (`idDepartamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialColaborador_NuevoDepartamento` FOREIGN KEY (`idNuevoDepartamento`) REFERENCES `puesto` (`idDepartamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialColaborador_NuevoPuesto` FOREIGN KEY (`idNuevoPuesto`) REFERENCES `puesto` (`idPuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialColaborador_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `fkfk_HistorialColaborador_PuestoAnterior` FOREIGN KEY (`idPuestoAnterior`) REFERENCES `puesto` (`idPuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialcolaborador`
--

LOCK TABLES `historialcolaborador` WRITE;
/*!40000 ALTER TABLE `historialcolaborador` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialcolaborador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialvacaciones`
--

DROP TABLE IF EXISTS `historialvacaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialvacaciones` (
  `idHistorialVacaciones` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaSolicitu` date NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `diasSolicitado` int(11) NOT NULL,
  `saldoAnterior` int(11) NOT NULL,
  `nuevoSaldo` int(11) NOT NULL,
  `estadoSolicitud` varchar(45) NOT NULL,
  `idTecnicoAprovador` int(11) NOT NULL,
  PRIMARY KEY (`idHistorialVacaciones`),
  KEY `fk_HistorialVacaciones_Usuario_idx` (`idUsuario`),
  KEY `fk_HistorialVacaciones_Tecnico_idx` (`idTecnicoAprovador`),
  CONSTRAINT `fk_HistorialVacaciones_Tecnico` FOREIGN KEY (`idTecnicoAprovador`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `fk_HistorialVacaciones_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialvacaciones`
--

LOCK TABLES `historialvacaciones` WRITE;
/*!40000 ALTER TABLE `historialvacaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `historialvacaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `idimagenes` int(11) NOT NULL AUTO_INCREMENT,
  `foto` varchar(250) NOT NULL,
  `idTickect` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  PRIMARY KEY (`idimagenes`),
  KEY `fk_Imagnes_Ticket_idx` (`idTickect`),
  KEY `fk_Imagenes_Rol_idx` (`idRol`),
  CONSTRAINT `fk_Imagenes_Rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Imagnes_Ticket` FOREIGN KEY (`idTickect`) REFERENCES `ticket` (`idTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `idLogin` varchar(20) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `Contraseña` varchar(20) NOT NULL,
  `idRol` int(11) NOT NULL,
  PRIMARY KEY (`idLogin`),
  KEY `fk_Login_Usuario_idx` (`idUsuario`),
  KEY `fk_Login_Rol_idx` (`idRol`),
  CONSTRAINT `fk_Login_Rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Login_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('artu',208090798,'123456',2),('jeyk',504240978,'123456',2),('vale',208160929,'123456',1);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prioridad`
--

DROP TABLE IF EXISTS `prioridad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prioridad` (
  `idPrioridad` int(11) NOT NULL AUTO_INCREMENT,
  `nombrePrioridad` varchar(150) NOT NULL,
  `nivel` int(11) NOT NULL,
  PRIMARY KEY (`idPrioridad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prioridad`
--

LOCK TABLES `prioridad` WRITE;
/*!40000 ALTER TABLE `prioridad` DISABLE KEYS */;
INSERT INTO `prioridad` VALUES (1,'Baja',1),(2,'Media',2),(3,'Alta',3),(4,'Critica',4);
/*!40000 ALTER TABLE `prioridad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puesto`
--

DROP TABLE IF EXISTS `puesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puesto` (
  `idPuesto` int(11) NOT NULL AUTO_INCREMENT,
  `nombrePuesto` varchar(150) NOT NULL,
  `descripcionPuesto` varchar(250) NOT NULL,
  `idDepartamento` int(11) NOT NULL,
  PRIMARY KEY (`idPuesto`),
  KEY `fk_Puentos_Departamento_idx` (`idDepartamento`),
  CONSTRAINT `fk_Puentos_Departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puesto`
--

LOCK TABLES `puesto` WRITE;
/*!40000 ALTER TABLE `puesto` DISABLE KEYS */;
INSERT INTO `puesto` VALUES (1,'Gerencia General','Lidera la empresa, define visión, metas y decisiones estratégicas.',1),(2,'Auditoría Interna','Revisa procesos y controles para garantizar transparencia.',1),(3,'Contabilidad','Registra y analiza movimientos financieros',2),(4,'Facturación y Cobros','Emite facturas y gestiona pagos de clientes.',2),(5,'Tesorería','Administra flujo de caja, pagos y cuentas bancarias',2),(6,'Asistente de Recursos Humanos','Apoya en tareas administrativas del área: organiza expedientes, atiende consultas básicas, colabora en reclutamiento y gestiona documentación de personal.',3),(7,'Coordinadora Recursos Humanos','upervisa procesos de talento humano: lidera al equipo de RRHH, coordina reclutamiento, evalúa desempeño y vela por el cumplimiento de políticas laborales.',3),(8,'Ventas','Atiende clientes individuales, corporativas y cierra ventas.',4),(9,'Atención al Cliente','Resuelve dudas, quejas y solicitudes de usuarios.',4),(10,'Infraestructura y Redes (TI)','Administra servidores, redes y conectividad.',5),(11,'Desarrollo Backend','Programa lógica del servidor y bases de datos.',5),(12,'Desarrollo Frontend','Diseña interfaces y experiencia del usuario.',5),(13,'QA / Testing','Prueba funcionalidades y detecta errores.',5),(14,'Seguridad Informática','Protege sistemas contra amenazas digitales.',5),(15,'Producción','Ejecuta procesos para crear productos o servicios.',6),(16,'Mantenimiento','Repara y conserva equipos e instalaciones.',6),(17,'Regulación y Normativas','Interpreta leyes aplicables al sector.',7),(18,'Contratos','Redacta y revisa acuerdos legales.',7);
/*!40000 ALTER TABLE `puesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionRol` varchar(150) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador'),(2,'Tecnico'),(3,'Usuario');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sla`
--

DROP TABLE IF EXISTS `sla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sla` (
  `idSLA` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) NOT NULL,
  `tiempoMaximoResolucion` varchar(150) NOT NULL,
  `tiempoMaximoRepuesta` varchar(150) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  PRIMARY KEY (`idSLA`),
  KEY `fk_SLA_Categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_SLA_Categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sla`
--

LOCK TABLES `sla` WRITE;
/*!40000 ALTER TABLE `sla` DISABLE KEYS */;
INSERT INTO `sla` VALUES (1,'Tiempo de Resolucion y Respuesta','2','24',1),(2,'Tiempo de Resolucion y Respuesta','4','48',2),(3,'Tiempo de Resolucion y Respuesta','2','48',3),(4,'Tiempo de Resolucion y Respuesta','2','48',4);
/*!40000 ALTER TABLE `sla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `idTicket` int(11) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(145) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `idEstado` int(11) NOT NULL,
  `idPrioridad` int(11) NOT NULL,
  `idEtiqueta` int(11) NOT NULL,
  `idUsuarioSolicitante` int(11) NOT NULL,
  `idUsuarioTecnico` int(11) NOT NULL,
  `fechaCierre` date DEFAULT NULL,
  `sLAMaxRespuesta` date NOT NULL,
  `sLAMaxResolucion` date NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `cumplimientoRespuesta` tinyint(4) NOT NULL,
  `cumplimientoResolucion` tinyint(4) NOT NULL,
  PRIMARY KEY (`idTicket`),
  KEY `fk_Ticket_estado_idx` (`idEstado`),
  KEY `fk_Ticket_Prioridad_idx` (`idPrioridad`),
  KEY `fk_Ticket_Etiqueta_idx` (`idEtiqueta`),
  KEY `fk_Ticket_UsuarioSolicitante_idx` (`idUsuarioSolicitante`),
  KEY `fk_Ticket_UsuarioEncargado_idx` (`idUsuarioTecnico`),
  KEY `Fk_TicKet_Categoria_idx` (`idCategoria`),
  CONSTRAINT `Fk_TicKet_Categoria` FOREIGN KEY (`idCategoria`) REFERENCES `etiqueta` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ticket_Etiqueta` FOREIGN KEY (`idEtiqueta`) REFERENCES `etiqueta` (`idEtiqueta`),
  CONSTRAINT `fk_Ticket_Prioridad` FOREIGN KEY (`idPrioridad`) REFERENCES `prioridad` (`idPrioridad`),
  CONSTRAINT `fk_Ticket_UsuarioEncargado` FOREIGN KEY (`idUsuarioTecnico`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `fk_Ticket_UsuarioSolicitante` FOREIGN KEY (`idUsuarioSolicitante`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `fk_Ticket_estado` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'Vacaciones','Por cita médica','2025-10-26',1,1,3,504240978,334567890,'2025-11-26','2025-10-26','2025-10-27',1,0,0),(2,'Actualizar datos','Cambio de numero de cuanta','2025-10-26',2,2,6,208090798,222345678,NULL,'2025-10-26','2025-10-27',2,0,0),(3,'Constancia Salarial','Solicitud de constancia salarial','2025-10-26',3,3,8,208160929,222345678,NULL,'2025-10-26','2025-10-28',3,0,0),(4,'Solicitud Vacaciones Anuales','Necesito solicitar vacaciones del 15 al 30 de noviembre para viaje familiar','2025-10-15',2,2,1,504240958,211234567,NULL,'2025-10-15','2025-10-16',1,0,0),(5,'Consulta Aguinaldo','Dudas sobre cálculo y fecha de pago del aguinaldo 2025','2025-10-18',1,1,13,208090798,211234567,NULL,'2025-10-18','2025-10-20',4,0,0),(6,'Certificado Salario','Necesito certificado de salarios últimos 6 meses para crédito bancario','2025-10-22',4,2,10,504240978,211234567,'2025-10-24','2025-10-22','2025-10-24',3,1,1),(7,'Actualización Datos Bancarios','Cambio de cuenta bancaria por cierre de banco anterior','2025-10-16',3,3,6,208160929,222345678,NULL,'2025-10-16','2025-10-18',2,0,0),(8,'Permiso Especial','Solicito permiso especial por cita médica especializada','2025-10-20',3,3,3,14234841,222345678,NULL,'2025-10-20','2025-10-21',1,1,0),(9,'Consulta Deducciones','Verificar deducciones incorrectas en planilla del mes anterior','2025-10-25',2,2,12,16784517,222345678,NULL,'2025-10-25','2025-10-27',4,0,0),(10,'Constancia Laboral','Requiero constancia laboral para trámite de residencia','2025-10-12',2,1,8,24514842,334567890,NULL,'2025-10-12','2025-10-14',3,0,0),(11,'Cambio Dirección','Actualizar dirección en sistema de recursos humanos','2025-10-19',2,1,5,112345678,334567890,NULL,'2025-10-19','2025-10-21',2,0,0),(12,'Carta Recomendación','Solicito carta de recomendación para maestría en administración','2025-10-28',1,2,9,133456789,334567890,NULL,'2025-10-28','2025-10-30',3,0,0),(13,'Días por Temas Personales','Solicitud de 2 días por asuntos personales urgentes familiares','2025-10-10',2,3,2,154841579,211234567,NULL,'2025-10-10','2025-10-11',1,0,0),(14,'Consulta Seguro Médico','Información sobre cobertura de seguro y agregar beneficiarios','2025-10-23',1,1,14,501234567,222345678,NULL,'2025-10-23','2025-10-25',4,0,0),(15,'Certificado Experiencia','Requiero certificado laboral con años de experiencia','2025-10-26',4,2,10,2001234567,334567890,'2025-10-27','2025-10-26','2025-10-28',3,1,1);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(145) NOT NULL,
  `apellido1` varchar(145) NOT NULL,
  `apellido2` varchar(145) NOT NULL,
  `telefono` varchar(145) NOT NULL,
  `direccion` varchar(145) NOT NULL,
  `correo` varchar(145) NOT NULL,
  `numerodeCuenta` varchar(145) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `salario` float NOT NULL,
  `saldoVacaciones` int(11) NOT NULL,
  `idDepartamento` int(11) NOT NULL,
  `idPuesto` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `contrasenna` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `fk_Usuario_Rol_idx` (`idRol`),
  KEY `fk_Usuario_Puesto_Departamento_idx` (`idPuesto`,`idDepartamento`),
  KEY `fk_Usuario_Departamento_idx` (`idDepartamento`),
  CONSTRAINT `fk_Usuario_Departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `puesto` (`idDepartamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Puesto` FOREIGN KEY (`idPuesto`) REFERENCES `puesto` (`idPuesto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (12345678,'Isabella','Mendez','Chichilla','89765436','Alajuela, Alajuela, Rio Segundo','isabellam@example.com','CR0123456789012898','2024-07-21',750000,6,3,6,2,1,'123456'),(14234841,'Pablo','Araya','Solano','88114567','Alajuela, Atenas','pablo.araya@example.com','CR1423456789012345','2023-09-05',955000,10,5,14,3,1,'123456'),(15678312,'Fernanda','Cahvez','Rojas','88225678','Cartago, El Guarco,','fernanda.chaves@example.com','CR1523456789012345','2023-10-12',650000,10,6,15,3,1,'123456'),(16784517,'Diego','Soto','Jiménez','88336788','Heredia, Belen','diego.soto@example.com','CR1623456789012345','2023-11-20',550000,7,6,16,3,1,'123456'),(24514842,'Valery','Soto','Soto','89745155','Alajuela, Poas, San Pedro','vale.soto@gmail.com','CR1723456789012345','2023-12-01',867000,9,7,17,3,1,'123456'),(112345678,'Laura','Gómez','Sánchez','88881234','San Jose, Montes de Oca, Sabanilla','laura.gomez@example.com','CR1234567890123456','2022-01-15',1200000,10,3,7,1,1,'123456'),(133456789,'Valeria','Céspedes','Montero','88003456','San José, Tibás, Colima','valeria.cespedes@example.com','CR1323456789012345','2023-08-10',955000,7,5,13,3,1,'123456'),(154841579,'Karla','Rodríguez','Mora','88669012','San José, Goicoechea, Guadalupe','karla.rodriguez@example.com','CR1923456789012345','2024-02-28',755000,4,7,18,3,1,'123456'),(208090798,'Arturo José','Oviedo','Sánchez','84366084','Alajuela, Alajuela, Rio Segundo','arturo.oviedo200@gmail.com','CR4567890123456789','2022-08-05',1110000,6,2,4,3,1,'123456'),(208160929,'Valery Julliana','Arrollo','Barrantes','61842429','Alajuela, Naranjo, San Juan','vlae.barrantes@gmail.com','CR5678901234567890','2022-09-18',1115000,0,5,12,3,1,'123456'),(211234567,'Juliana','Cordero','Esquivel','88885672','Cartago, Oreamuro, San Rafael','juliana.cordero@example.com','CR2123456789012345','2022-07-10',750000,3,3,6,2,1,'123456'),(222345678,'Gabriela','Alfaro','Quirós','88996784','Heredia, San Pablo, Rincón  de Sabanilla','gabriela.alfaro@example.com','CR2223456789012345','2022-06-20',750000,7,3,6,2,1,'123456'),(223456789,'Andrés','Rojas','Mora','88992345','Alajuela, Grecia, San Roque','andres.rojas@example.com','CR2345678901234567','2022-03-22',750000,5,2,3,3,1,'123456'),(334567890,'Mariana','Solís','Vargas','87003456','Cartago, Turrialba, La Suiza ','mariana.sol@example.com','CR3456789012345678','2022-06-10',750000,5,3,6,2,1,'123456'),(501234567,'Camila','Mora','Chacón','87881234','Heredia, Heredia, San Francisco','camila.mora@example.com','CR1123456789012345','2023-06-15',455000,5,4,9,3,1,'123456'),(504240958,'Maria José','Brenes','Rodriguez','87569812','Alajuela, Poas, San Pedro','maria.brenes@hotmail.com','CR1623456789012378','2023-11-20',455000,3,4,9,3,1,'123456'),(504240978,'Jeyko ','Ubau','Hernández','89108795','Heredia, Heredia, Ulloa','jeykoubau@hotmail.com','CR6789012345678901','2022-11-30',1755000,15,5,11,3,1,'123456'),(778901234,'Sofía','Navarro','Araya','87447890','San José, Desamparados, San Rafael','sofia.navarro@example.com','CR7890123456789012','2023-01-12',950000,5,1,2,3,1,'123456'),(889012345,'Esteban','Vargas','Céspedes','87558901','Alajuela, San Carlos, Ciudad Quesada','esteban.vargas@example.com','CR8901234567890123','2023-02-25',2115000,4,1,1,3,1,'123456'),(990123456,'Natalia','Pineda','Useña','87669012','Cartago, Paraiso, Llanos de Santa Lucía','natalia.pineda@example.com','CR9012345678901234','2023-04-03',750000,7,2,5,3,1,'123456'),(1223456789,'José','Ramirez','León','87992345','Alajuela, San Ramon, San Ramon','jose.ramirez@example.com','CR1223456789012345','2023-07-01',655000,10,5,10,3,1,'123456'),(2001234567,'Mauricio','Solano','Pineda','88770123','Alajuela, Palmares, Buenos Aires','mauricio.solano@example.com','CR2023456789012345','2024-03-10',455000,7,4,8,3,1,'123456'),(2147483647,'Ricardo','Salas','Brenes','87770123','Heredia, Flores','ricardo.salas@example.com','CR0123456789012345','2023-05-20',458000,8,4,8,3,1,'123456');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoracion`
--

DROP TABLE IF EXISTS `valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoracion` (
  `idValoracion` int(11) NOT NULL AUTO_INCREMENT,
  `idComentario` int(11) NOT NULL,
  `idTicket` int(11) NOT NULL,
  `Valoracion` int(11) NOT NULL,
  PRIMARY KEY (`idValoracion`),
  KEY `Fk_Valoracion_Comentario_idx` (`idComentario`),
  KEY `FK_Valoracion_Ticket_idx` (`idTicket`),
  CONSTRAINT `FK_Valoracion_Ticket` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Fk_Valoracion_Comentario` FOREIGN KEY (`idComentario`) REFERENCES `comentario` (`idcomentario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoracion`
--

LOCK TABLES `valoracion` WRITE;
/*!40000 ALTER TABLE `valoracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `valoracion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-28 23:31:48
