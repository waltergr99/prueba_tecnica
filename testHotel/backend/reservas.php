<?php

require_once 'clases/respuestas.class.php';
require_once 'clases/reservas.class.php';

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");

$_respuestas = new respuestas;
$reservas = new reservas;

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = $_GET['id'];
    $listarReservas = $reservas->listarReservas($id);
    header("Content-Type: application/json");
    echo json_encode($listarReservas);
    http_response_code(200);

} else if($_SERVER['REQUEST_METHOD'] == 'POST'){
    

    $postBody = file_get_contents("php://input");

    $datosArray = $reservas->post($postBody);

    header('Content-Type: application/json');
    if(isset($datosArray["result"]["error_id"])){
        $responseCode = $datosArray["result"]["error_id"];
        http_response_code($responseCode);
    }else{
        http_response_code(200);
    }
    echo json_encode($datosArray);


} else if($_SERVER['REQUEST_METHOD'] == 'PUT'){

}else if($_SERVER['REQUEST_METHOD'] == 'DELETE'){

}else{
    header('Content-Type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}