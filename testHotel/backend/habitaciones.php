<?php

require_once 'clases/respuestas.class.php';
require_once 'clases/habitaciones.class.php';


$_respuestas = new respuestas;
$habitaciones = new habitaciones;

if($_SERVER['REQUEST_METHOD'] == 'GET') {

    $listarHabitaciones = $habitaciones->listarHabitaciones();
    header("Content-Type: application/json");
    echo json_encode($listarHabitaciones);
    http_response_code(200);

} else if($_SERVER['REQUEST_METHOD'] == 'POST'){

} else if($_SERVER['REQUEST_METHOD'] == 'PUT'){

}else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){

}else{
    header('Content-Type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}