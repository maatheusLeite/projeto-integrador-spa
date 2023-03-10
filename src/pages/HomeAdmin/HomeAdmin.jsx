import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReservationCard from '../../components/ReservationCard/ReservationCard'
import './HomeAdmin.css'
import AdminHeader from '../../components/AdminHeader/AdminHeader'

export default function HomeAdmin() {

    const [reservations, setReservations] = useState([])
    const [date, setDate] = useState(new Date().toISOString())
    const [searchDate, setSearchDate] = useState()

    const navigate = useNavigate()
    const location = useLocation()
    const admin = location.state

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/reservations"
    })

    useEffect(() => {
        verifyLogin()
        loadReservations()
    })

    function verifyLogin() {
        if(admin === null) {
            navigate('/admin')
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        loadReservations()
    } 

    async function loadReservations() {
        let response = await axiosClient.get()
        const allReservations = []
        
        setReservations([])

        response.data.forEach(reservation => {
            if (reservation.bookedDate.split('T')[0] === date.split('T')[0]) {
               allReservations.push(reservation)
            }
        })

        allReservations.forEach(reservation => {
            setReservations((reservations) => [reservation, ...reservations])
        })
        
        // The date is used to adjust the time zone by 3 hours 
        setSearchDate(new Date(date.split('T')[0] + 'T03:00:00Z').toLocaleDateString())
    }

    return (
        <div>
            <AdminHeader admin={admin}/>

            <div className='search'> 
                <form action="" onSubmit={handleSubmit}>
                    <div className='row'>
                        <span className='black'> Buscar reservas pela data </span>

                        <input 
                            type='date'
                            id='date'
                            name='date'
                            onChange={(event) => setDate(event.target.value)}
                            className='admin-input'
                        />
                    </div>
                </form>
            </div>

            <div className='admin-center'>
                <span className='admin-title'> RESERVAS PARA O DIA:  </span> 
                <span className='transparent'> {':'} </span>
                <span className='highlight-color'> {searchDate} </span>
            </div>

            <div className='admin-reservations-container'>
                {(
                    reservations[0] == null ?
                        <span className='admin-reservations-message'> Nenhuma reserva cadastrada para esta data. </span>
                    : 
                        reservations.map(reservation => <ReservationCard reservation={reservation}/>) 
                        
                )}
            </div>
        </div>
    )
}
