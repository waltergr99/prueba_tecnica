<?php

require_once "conexion/conexion.php";
require_once "respuestas.class.php";

class reservas extends conexion {

    private $table = "reservas";

    private $name = "";
    private $email = "";
    private $dateadmission = "0000-00-00 00:00:00";
    private $departuredate = "0000-00-00 00:00:00";
    private $room = "";

    public function listarReservas($id) {
        $query = "SELECT * FROM reservas WHERE room = $id";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

    public function post($json){

        $_respuestas = new respuestas;
        $datos = json_decode($json, true);
        
        if(isset($datos["name"])){$this->name = $datos['name'];}
        if(isset($datos["email"])){$this->email = $datos['email'];}
        if(isset($datos["dateadmission"])){$this->dateadmission = $datos['dateadmission'];}
        if(isset($datos["departuredate"])){$this->departuredate = $datos['departuredate'];}
        if(isset($datos["room"])){$this->room = $datos['room'];}
        
        $resp = $this->insertProduct();

        if($resp){
            $respuesta = $_respuestas->response;
            $respuesta["result"] =array(
                "reservaId" => $resp
            );
            return $respuesta;
        }else{
            return $_respuestas->error_500();
        }

    }

    private function insertProduct(){
        $query = "INSERT INTO ". $this->table . "(name, email, dateadmission, departuredate, room)
        VALUES ('".$this->name."','".$this->email."','".$this->dateadmission ."','".$this->departuredate ."','".$this->room ."')";

        $resp = parent::nonQueryId($query);
        if($resp){
            return $resp;
        }else{
            return 0;
        }
    }

}