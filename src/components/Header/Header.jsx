import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({user}) {
    
    const [reservasPagePath, setReservasPagePath] = useState('')

    useEffect(() => {
        checkLogedUser()
    })

    function checkLogedUser() {
        if (user !== null) {
            setReservasPagePath('/reservas')
        }
        else {
            setReservasPagePath('/entrar')
        }
    }

    return (
        <header className='header-container'>
            <Link className='link' to="/" state={user}>
                <h2 className='logo'> 
                    <span> DON </span>
                    <span> FERRARO </span>    
                </h2>
            </Link>
            
            <nav>
                <Link to='/' state={user} className='nav-item'> HOME </Link>
                <Link to='/cardapio' state={user} className='nav-item'> CARDÁPIO </Link>
                <Link to={reservasPagePath} state={user} className='nav-item'> RESERVAS </Link>
                <Link to='/contato' state={user} className='nav-item'> CONTATO </Link>
            </nav>
                
            {(
                user === undefined || user === null ? 
                    <div className='user-info'>
                        <button className='btn-login'><span className='sahitya'> Cadastrar </span></button>
                        <Link to='/entrar' className='link btn-exit sahitya'> Entrar </Link>
                    </div>
                :
                    <div className='user-info'>
                        <span className='user-name'> {user.name} </span>
                        <Link to='/usuario' state={user} className='link btn-config sahitya'> Meu Perfil </Link>
                        <Link to='/' className='link btn-exit sahitya'> Sair </Link>
                    </div>
            )}
        </header>
  )
}
