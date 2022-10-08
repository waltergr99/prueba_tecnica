import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";



const Card = ({item})=> {

  const [reservas, setReservas] = useState([]);

  const getReservas = async(id)=> {
    const {data} = await axios.get(`http://localhost/hotel/reservas.php?id=${id}`);
    setReservas(data); 
  }
  useEffect(() =>{
    getReservas(item.id);
  },[])

  return(
    <div style={{margin: '20px', padding: '20px', width: '250px', background: '#0072E5', color: 'white'}}>
      <div>
        <p>{item.name}</p>
      </div>
      <div>
        <p>Maximo de personas: {item.maxpeople}</p>
      </div>
      <div>
        <p>Precio: ${item.price}</p>
      </div>
      <div>
        {reservas.length > 0 ? <p>Reservado: </p> : null}
        {reservas.map((reserva)=>(
          <div key={reserva.id+1111}>
           
            <span>{reserva.dateadmission}</span>{' al '}
            <span>{reserva.departuredate}</span>
          </div>
        ))
        }
      </div>
      <div>
        <Link to={`/reserva/${item.id}`} >
            <button>Reservar</button>
        </Link>
        
      </div>
    </div>
  )
}

function Habitaciones() {

  const [habitaciones, setHabitaciones] = useState([]);
  
  const getHabitaciones = async()=> {
    const {data} = await axios.get('http://localhost/hotel/habitaciones.php');
    setHabitaciones(data);
  }


  useEffect(()=>{
    getHabitaciones();
  },[])

  return (
    <div className="App">
      <div>
        <h2>Habitaciones disponibles</h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {habitaciones.map((habitacion)=>(
              <Card key={habitacion.id+1} item={habitacion} >{habitacion.name}</Card>
            ))}
        </div>
      </div>

      <div>
              
      </div>
    </div>
  );
}

export default Habitaciones;
