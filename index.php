<?php
// Composer autoloader
require_once 'vendor/autoload.php';
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');
header('Content-Type: application/json; charset=UTF-8');

// Manejar peticiones OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/*--- Requerimientos Clases o librerías*/
require_once "controllers/core/Config.php";
require_once "controllers/core/HandleException.php";
require_once "controllers/core/Logger.php";
require_once "controllers/core/MySqlConnect.php";
require_once "controllers/core/Request.php";
require_once "controllers/core/Response.php";

/***--- Agregar todos los modelos*/
require_once "models/UsuarioModel.php";
require_once "models/TecnicosModel.php";
require_once "models/TicketModel.php";
require_once "models/CategoriaModel.php";
require_once "models/EtiquetaModel.php";
require_once "models/SLAModel.php";
require_once "models/ComentarioModel.php";
require_once "models/ImagenModel.php";
require_once "models/LoginModel.php";
require_once "models/PuestoModel.php";
require_once "models/DepartamentoModel.php";
require_once "models/RolModel.php";

/***--- Agregar todos los controladores*/
require_once "controllers/UsuarioController.php";
require_once "controllers/TecnicosController.php";
require_once "controllers/TicketController.php";
require_once "controllers/CategoriaController.php";
require_once "controllers/EtiquetaController.php";
require_once "controllers/SLAController.php";
require_once "controllers/ComentarioController.php";
require_once "controllers/ImagenController.php";
require_once "controllers/LoginController.php";
require_once "controllers/PuestoController.php";
require_once "controllers/DepartamentoController.php";
require_once "controllers/RolController.php";

//Enrutador
require_once "routes/RoutesController.php";
$index = new RoutesController();
$index->index();


