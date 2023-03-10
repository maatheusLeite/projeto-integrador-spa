import React from 'react'
import { Link } from 'react-router-dom'
import './AdminHeader.css'

export default function AdminHeader({ admin }) {
    return (
        <header className='admin-header-container'>
            <h2 className='logo'>
                <span> DON </span>
                <span> FERRARO </span>
            </h2>
        
            <div className='admin-info'>
                <span className='admin-name'> {admin.loginName} </span>
                <Link to='/admin' className='link btn-exit sahitya'> Sair </Link>
            </div>
        </header>
    )
}
