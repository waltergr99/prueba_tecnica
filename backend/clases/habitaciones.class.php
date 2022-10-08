<?php

require_once "conexion/conexion.php";
require_once "respuestas.class.php";

class habitaciones extends conexion {

    public function listarHabitaciones() {
        $query = "SELECT * FROM habitaciones";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

}