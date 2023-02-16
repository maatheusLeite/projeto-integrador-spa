import React from 'react'
import Header from '../../components/Header/Header'
import './Usuario.css'

export default function Usuario({user}) {

    function formatPhone(phone) {
        let formatedPhone;

        if (phone.length === 10) {
            formatedPhone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2, 6) + '-' + phone.substring(6, 10) 
        }
        else if (phone.length === 11) {
            formatedPhone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2, 7) + '-' + phone.substring(7, 11) ;
        }

        return formatedPhone
    }

    return (
        <div>
            <Header userName={user.name} />

            <main className='usuario-container'>
                <h3 className='welcome'> Seja bem vindo(a) {user.name} </h3>

                <div className='user-card'>
                    <h4> Seus dados: </h4>
                    <span className='user-item'> <b> Nome: </b>  {user.name} </span>
                    <span className='user-item'> <b> Email: </b> {user.email} </span>
                    <span className='user-item'> <b> Celular: </b>  {formatPhone(user.phone)} </span>
                </div>
            </main>
        </div>
    )
}
