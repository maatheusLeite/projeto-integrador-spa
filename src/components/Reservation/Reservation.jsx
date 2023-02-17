import React from 'react'
import { Link } from 'react-router-dom';
import './Reservation.css'

export default function Reservation({reservation, hideButton}) {

  const generationMomentDay = new Date(reservation.generationMoment).toLocaleString()
  const bookedDate = new Date(reservation.bookedDate).toLocaleString()

  return (
    <div className='reservation-card'> 
      <div className='reservation-info'>
        <span className='card-item'> <b> ID DA RESERVA: </b> {reservation.id} </span>
        <span className='card-item'> <b> QUANTIDADE DE PESSOAS: </b> {reservation.peopleAmount} </span>
        <span className='card-item'> <b> RESERVA GERADA EM: </b> {generationMomentDay} </span>
        <span className='card-item'> <b> DATA E HORA RESERVADAS: </b> {bookedDate} </span>
      </div>

      <Link 
        to='/reservas/cancelar' 
        className='btn-delete'
        state={reservation} 
        hidden={hideButton}
      > Cancelar Reserva </Link> 
    </div>
  )
}
