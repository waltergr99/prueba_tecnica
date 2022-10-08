import React, {useEffect, useState}  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { useParams } from 'react-router-dom';


function Reservas() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dateadmission, setDateadmission] = useState('');
    const [departuredate, setDeparturedate] = useState('');
    const [reservas, setReservas] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    let  {id}  = useParams();

    const getReservas = async(id)=> {
        const {data} = await axios.get(`http://localhost/hotel/reservas.php?id=${id}`);
        setReservas(data); 
        console.log(data);
    }
    useEffect(() =>{
        getReservas(id);
    },[])


    const validarFechaEnRango = (reservas,dateadmission, departuredate)=>{

        const dateinicio = new Date(dateadmission).getTime();
        const datefin = new Date(departuredate).getTime();

        const resp = reservas.map((reserva)=>{
                const inicio = new Date(reserva.dateadmission).getTime();
                const fin = new Date(reserva.departuredate).getTime();

                if(dateinicio >= inicio && dateinicio <= fin || datefin >= inicio && datefin <= fin){
                    return true;
                }else{
                    return false;
                }

        })
        return resp;
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const $json = {
            name,
            email,
            dateadmission,
            departuredate,
            "room": id
        }
        

        const arrayRespnse = validarFechaEnRango(reservas, dateadmission, departuredate);


        if(arrayRespnse.find(e => e === true) || dateadmission === '' || departuredate === '' || dateadmission == new Date()){
            
            if(dateadmission === '' && departuredate === ''){
                setError('completar todos los campos');
            }else if(arrayRespnse.find(e => e === true)){
                setError('La fecha ingresada ya esta reservada');
            }

            setTimeout(() => {
                setError(null);
            }, 2000);
        }else{
            const {data} = await axios.post(`http://localhost/hotel/reservas.php`, $json);
            if(data.status === 'ok'){
                setSuccess('Habitación reservada correctamente');
                setTimeout(() => {
                    setSuccess(null);
                }, 2000);
            }else{
                setSuccess('No se pudo realizar la reserva, vuelva a intentarlo');
                setTimeout(() => {
                    setSuccess(null);
                }, 2000);
            }
        }
 
    }

    return (
        <div style={{width: '100%', height:'90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
           
            <form 
                style={{ width: '350px', padding: '20px 10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0072E5', color: '#fff'}} onSubmit={handleSubmit}>
                
                <h2>Reservar Habitación {id}</h2>
                <div style={{marginBottom: '20px'}}>
                    <label>Nombres:</label>
                    <input type="text" placeholder='nombres' onChange={(e)=>{setName(e.target.value)}}></input>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label>Email:</label>
                    <input type="text" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>
               <div style={{marginBottom: '20px'}}>
                    <label>Fecha de ingreso:</label>
                    <input type="date" onChange={(e)=>{setDateadmission(e.target.value)}}></input>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label>Fecha de salida:</label>
                    <input type="date" onChange={(e)=>{setDeparturedate(e.target.value)}}></input> 
                </div>
                <div style={{display: 'flex', marginBottom: '20px'}}>
                    <button 
                        type="submit"
                        style={{background: '#0A1929', padding: '5px 10px', color: '#fff', borderRadius: '5px', margin: '5px', cursor: 'pointer'}}
                    >
                        Reservar
                    </button>
                    <Link to={`/`} style={{background: '#0A1929', padding: '5px 10px', color: '#fff', borderRadius: '5px', margin: '5px', textDecoration: 'none'}}>
                        Atras
                    </Link>
                    
                </div>
            </form>
            {success && <p style={{color: 'green'}}>{success}</p>}
            {error && <p style={{color: 'red'}}>{error}</p> }
        </div>
    )
}

export default Reservas
