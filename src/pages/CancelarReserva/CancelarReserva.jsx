import React from 'react'
import './CancelarReserva.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Reservation from '../../components/Reservation/Reservation'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CancelarReserva() {

    const location = useLocation()
    const reservation = location.state
    const user = reservation.client

    const navigate = useNavigate()

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/reservations"
    })

    async function deleteReservation(id) {
        await axiosClient.delete(`${id}`)
        alert('Reserva cancelada com sucesso!')
        navigate('/reservas', {state: user})
    }

    return (
        <div>
            <Header user={user} />

            <div className='cancelar-container'>
                <Reservation reservation={reservation} hideButton='true' />

                <div className='warning'>
                    <span className='warning-text'><b> ATENÇÃO </b></span>
                    <span className='warning-text'><b> Esta reserva será cancelada. </b></span>
                    <span className='warning-text'> Gostaria mesmo de cancela-la? </span>    
                </div>
                
                <div className='buttons'>
                    <Link to={'/reservas'} state={user} className='btn-go-back'> Voltar  </Link>
                    <button 
                        onClick={() => deleteReservation(reservation.id)}
                        className='btn-cancel'> Cancelar reserva </button>
                </div>
            </div>
        </div>
    )
}
