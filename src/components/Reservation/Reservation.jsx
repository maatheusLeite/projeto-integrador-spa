import React from 'react'
import './Reservation.css'

export default function Reservation({reservation}) {

  const generationMomentDay = new Date(reservation.generationMoment).toLocaleString();
  const bookedDate = new Date(reservation.bookedDate).toLocaleString();

  return (
    <div className='reservation-card'> 
      <div className='reservation-info'>
        <span className='card-item'> ID da reserva: {reservation.id} </span>
        <span className='card-item'> Quantidade de pessoas: {reservation.peopleAmount} </span>
        <span className='card-item'> Reserva gerada em: {generationMomentDay} </span>
        <span className='card-item'> Data e hora reservada: {bookedDate} </span>
      </div>
      <button className='btn-delete'> Excluir Reserva </button>
    </div>
  )
}
