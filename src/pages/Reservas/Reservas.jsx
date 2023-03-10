import React, { useEffect, useState } from 'react'
import './Reservas.css'
import Header from '../../components/Header/Header'
import Reservation from '../../components/Reservation/Reservation'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Reservas() {

    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state

    const [reservations, setReservations] = useState([])
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [bookedDate, setBookedDate] = useState('')
    const [bookedHour, setBookedHour] = useState('T18:00:00Z')
    const [disabledButton, setDisabledButton] = useState(true)
    const [buttonText, setButtonText] = useState('Data invalida')

    const minDate = new Date().toISOString().split('T')[0]

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/reservations"
    })

    useEffect(() => {
        verifyLogin()
        loadReservations()
    })

    function verifyLogin() {
        if(user === null) {
            navigate('/entrar')
        }
    }

    async function loadReservations() {
        let response = await axiosClient.get()
        const userReservations = []
        
        response.data.forEach(reservation => {
            if (reservation.client.id === user.id) {
                hideClientPassword(reservation.client)
                userReservations.push(reservation)
            }
        })
        
        setReservations(userReservations)
    } 

    function hideClientPassword(client) {
        client.password = undefined 
    }

    function handleSubmit(event)  {
        event.preventDefault()
        const finalDate = getFinalDate()
        addReservation(peopleAmount, finalDate)
        alert('Reserva cadastrada!')
    } 

    function getFinalDate() {
        if(bookedDate !== '') {
            return bookedDate.valueOf().split('T')[0] + bookedHour
        }
    }

    async function addReservation(peopleAmount, bookedDate) {
        const generationMoment = new Date().toISOString().split('.')[0]+'Z'
        
        let response = await axiosClient.post('', {
            peopleAmount: peopleAmount,
            generationMoment: generationMoment,
            bookedDate: bookedDate,
            client: user
        })
        
        setReservations((reservations) => [response.data, ...reservations])
    }

    function handleBookedDate(event) {
        setBookedDate(event.target.value)
        if(bookedDate.valueOf() === '') {
            setDisabledButton(false)
            setButtonText('Reservar')
        }
    }

    return (
        <div>
            <Header user={user} />

            <div className='central-line'></div>
            <div className='titles'> 
                    <h3 className='reservas-title'> Minhas Reservas </h3>
                    <h3 className='reservas-title'> Nova Reserva </h3>
            </div>
            
            <main className='reservas-container'>
                <div className='left-container'>                     

                    {(
                        reservations[0] == null ?
                            <span className='center'> Você não possui reservas no momento. </span>
                        : 
                            reservations.map(reservation => <Reservation reservation={reservation}/>)
                    )}
                    
                </div>

                <div className='right-container'> 
                
                    <form action="" onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <label htmlFor=""> Quantidade de pessoas: </label>
                            <input 
                                type='number' 
                                id='peopleAmount' 
                                name='peopleAmount' 
                                min='1' max='10' 
                                value={peopleAmount}
                                onChange={(event) => setPeopleAmount(event.target.value)} 
                                className='input-box' 
                            />
                        </div>
                        
                        <div className='input-container'>
                            <label htmlFor=""> Data a ser reservada: </label>
                            <input 
                                type="date" 
                                id='bookedDate' 
                                name='bookedDate' 
                                value={bookedDate}
                                min={minDate} 
                                onChange={handleBookedDate} 
                                className='input-box-date'
                            />
                        </div>

                        <div className='input-container'>
                            <label htmlFor=""> Hora a ser reservada: </label>
                            <select 
                                name="bookedHour" 
                                id="bookedHour"
                                value={bookedHour}
                                onChange={(event) => setBookedHour(event.target.value)}
                                className='select-box'
                            >
                                {/* Thease values are 3 hours adjusted to brasilia time zone */}
                                <option value="T18:00:00Z"> 15:00 h </option>
                                <option value="T19:00:00Z"> 16:00 h </option>
                                <option value="T20:00:00Z"> 17:00 h </option>
                                <option value="T21:00:00Z"> 18:00 h </option>
                                <option value="T22:00:00Z"> 19:00 h </option>
                                <option value="T23:00:00Z"> 20:00 h </option>
                                <option value="T24:00:00Z"> 21:00 h </option>
                            </select>
                        </div>

                        <button disabled={disabledButton} className='btn-register'> {buttonText} </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
