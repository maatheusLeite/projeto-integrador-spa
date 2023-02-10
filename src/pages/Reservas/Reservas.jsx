import React from 'react'
import './Reservas.css'
import Header from '../../components/Header/Header'
import Reservation from '../../components/Reservation/Reservation'

export default function Reservas({user}) {

    const reservations = [
        {
            id: 5,
            peopleAmount: 8,
            generationMoment: '2022-06-23T08:02:07Z',
            bookedDate: '2022-06-23T18:00:00Z'
        },
        {
            id: 5,
            peopleAmount: 8,
            generationMoment: '2022-06-23T08:02:07Z',
            bookedDate: '2022-06-23T18:00:00Z'
        },
        {
            id: 5,
            peopleAmount: 8,
            generationMoment: '2022-06-23T08:02:07Z',
            bookedDate: '2022-06-23T18:00:00Z'
        }
    ] 

    const reservation1 = {
        id: 5,
        peopleAmount: 8,
        generationMoment: '2022-06-23T08:02:07Z',
        bookedDate: '2022-06-23T18:00:00Z'
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
                
                    <form action="">
                        <div className='input-container'>
                            <label htmlFor=""> Quantidade de pessoas: </label>
                            <input type='number' min='1' max='10' placeholder='0' className='input-box'></input>
                        </div>
                        
                        <div className='input-container'>
                            <label htmlFor=""> Data a ser reservada: </label>
                            <input type="datetime-local" className='input-box-date'></input>
                        </div>

                        <button className='btn-register'> Reservar </button>
                    </form>

                </div>
            </main>
        </div>
    )
}
