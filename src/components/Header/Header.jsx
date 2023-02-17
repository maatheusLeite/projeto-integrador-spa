import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({user}) {

    return (
        <header className='header-container'>
            <Link className='link' to="/">
                <h2 className='logo'> 
                    <span> DON </span>
                    <span> FERRARO </span>    
                </h2>
            </Link>
            
            <nav>
                <Link to='/' state={user} className='nav-item'> HOME </Link>
                <Link to='/cardapio' state={user} className='nav-item'> CARDÁPIO </Link>
                <Link to='/reservas' state={user} className='nav-item'> RESERVAS </Link>
                <Link to='/contato' state={user} className='nav-item'> CONTATO </Link>
            </nav>
                
            {(
                user === undefined || user === null ? 
                    <div className='user-info'>
                        <button className='btn-config'><span className='sahitya'> Cadastrar </span></button>
                        <button className='btn-exit'> <span className='sahitya'> Entrar </span> </button>
                    </div>
                :
                    <div className='user-info'>
                        <span className='user-name'> {user.name} </span>
                        <Link to='/usuario' state={user} className='link btn-config sahitya'> Meu Perfil </Link>
                        <Link to='/' state={user} className='link btn-exit sahitya'> Sair </Link>
                    </div>
            )}
        </header>
  )
}
