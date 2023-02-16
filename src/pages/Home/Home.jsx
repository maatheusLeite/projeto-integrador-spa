import React from 'react'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home({user}) {

    return (
        <div className='home-container'>
            <Header className='header' userName={user.name} />
            <main className='main-card'>
                <h1 className='title'> 
                    <span> DON </span>
                    <span> FERRARO </span> 
                </h1>

                <p className='description'> 
                    Diversos pratos classicos da cozinha italiana feitos de maneira fiel e <br />
                    minuciosa, para satisfazer até o mais exigente e <br />
                    refinado paladar.
                </p>

                <div className='butons'>
                    <Link to='/cardapio'><button className='btn-menu'> NOSSO CARDÁPIO </button></Link>
                    <Link to='/reservas'><button className='btn-reservations'> RESERVAR HORARIO </button></Link>
                </div>
            </main>
        </div>
    )
}
