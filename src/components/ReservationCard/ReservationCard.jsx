import React from 'react'
import './ReservationCard.css'

export default function ReservationCard({ reservation }) {

  const generationMomentDay = new Date(reservation.generationMoment).toLocaleString()
  const bookedDate = new Date(reservation.bookedDate).toLocaleString()

  function formatPhone(phone) {
    let formatedPhone;

    if (phone.length === 10) {
      formatedPhone = '(' + phone.substring(0, 2) + ') '
        + phone.substring(2, 6) + '-' + phone.substring(6, 10)
    }
    else if (phone.length === 11) {
      formatedPhone = '(' + phone.substring(0, 2) + ') '
        + phone.substring(2, 7) + '-' + phone.substring(7, 11)
    }

    return formatedPhone
  }

  return (
    <div className='admin-reservation-card-container'>
      <div className='reservation-info'>
        <span className='card-item-2'> <b> ID DO CLIENTE: </b> {reservation.client.id} </span>
        <span className='card-item-2'> <b> NOME: </b> {reservation.client.name} </span>
        <span className='card-item-2'> <b> EMAIL: </b> {reservation.client.email} </span>
        <span className='card-item-2'> <b> PHONE: </b> {formatPhone(reservation.client.phone)} </span>

        <div className='division'></div>

        <span className='card-item-2'> <b> ID DA RESERVA: </b> {reservation.id} </span>
        <span className='card-item-2'> <b> QUANTIDADE DE PESSOAS: </b> {reservation.peopleAmount} </span>
        <span className='card-item-2'> <b> RESERVA GERADA EM: </b> {generationMomentDay} </span>
        <span className='card-item-2'> <b> DATA E HORA RESERVADAS: </b> {bookedDate} </span>
      </div>
    </div>
  )
}
