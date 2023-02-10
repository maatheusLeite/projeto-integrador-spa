import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header(props) {

    return (
        <header className='header-container'>
            <Link className='link' to="/">
                <h2 className='logo'> 
                    <span> DON </span>
                    <span> FERRARO </span>    
                </h2>
            </Link>
            
            <nav>
                <Link to='/' className='nav-item'> HOME </Link>
                <Link to='/cardapio' className='nav-item'> CARDÁPIO </Link>
                <Link to="/reservas" className='nav-item'> RESERVAS </Link>
                <Link to='/contato' className='nav-item'> CONTATO </Link>
            </nav>
                
            {(
                props.userName === '' || props.userName === null ? 
                    <div className='user-info'>
                        <button className='btn-config'> <span className='sahitya'> Cadastrar </span> </button>
                        <button className='btn-exit'> <span className='sahitya'> Entrar </span> </button>
                    </div>
                :
                    <div className='user-info'>
                        <span className='user-name'> {props.userName} </span>
                        <button className='btn-config'> <span className='sahitya'> Meu Perfil </span> </button>
                        <button className='btn-exit'> <span className='sahitya'> Sair </span> </button>
                    </div>
            )}
        </header>
  )
}
