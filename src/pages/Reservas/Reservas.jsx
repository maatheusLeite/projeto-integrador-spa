import React, { useEffect, useState } from 'react'
import './Reservas.css'
import Header from '../../components/Header/Header'
import Reservation from '../../components/Reservation/Reservation'
import axios from 'axios'

export default function Reservas({user}) {

    const [reservations, setReservations] = useState([])
    const [peopleAmount, setPeopleAmount] = useState(1)
    const [bookedDate, setBookedDate] = useState('')
    const [bookedHour, setBookedHour] = useState('T18:00:00Z')
    const [disabled, setDisabled] = useState(true)
    const [buttonText, setButtonText] = useState('Data invalida')

    const minDate = new Date().toISOString().split('T')[0]

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/reservations"
    })

    useEffect(() => {
        const fetchReservations = async () => {
            let response = await axiosClient.get()
            const userReservations = []
            
            response.data.forEach(reservation => {
                if (reservation.client.id === user.id) {
                    reservation.client = undefined // Hide the user information from every reservation
                    userReservations.push(reservation)
                }
            })
            
            setReservations(userReservations);
        }

        fetchReservations();
    }, [])

    const addReservation = async (peopleAmount, bookedDate) => {
        const generationMoment = new Date().toISOString().split('.')[0]+'Z'
        
        let response = await axiosClient.post('', {
            peopleAmount: peopleAmount,
            generationMoment: generationMoment,
            bookedDate: bookedDate,
            client: user
        })
        setReservations((reservations) => [response.data, ...reservations])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const finalDate = setFinalDate()
        addReservation(peopleAmount, finalDate)
        alert('Reserva cadastrada!')
    } 

    const handleBookedDate = (e) => {
        setBookedDate(e.target.value)
        if(bookedDate.valueOf() === '') {
            setDisabled(false)
            setButtonText('Reservar')
        }
    }

    function setFinalDate() {
        if(bookedDate !== '') {
            const finalDate = bookedDate.valueOf().split('T')[0] + bookedHour
            return finalDate
        }
    }

    return (
        <div>
            <Header userName={user.name} />

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
                                id='bookedDate' 
                                name='bookedDate' 
                                value={bookedDate}
                                min={minDate} 
                                onChange={handleBookedDate} 
                                type="date" 
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
                                {/* The value is 3 hours adjusted to Brazilia time zone */}
                                <option value="T18:00:00Z"> 15:00 h </option>
                                <option value="T19:00:00Z"> 16:00 h </option>
                                <option value="T20:00:00Z"> 17:00 h </option>
                                <option value="T21:00:00Z"> 18:00 h </option>
                                <option value="T22:00:00Z"> 19:00 h </option>
                                <option value="T23:00:00Z"> 20:00 h </option>
                                <option value="T24:00:00Z"> 21:00 h </option>
                            </select>
                        </div>

                        <button disabled={disabled} className='btn-register'> {buttonText} </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
