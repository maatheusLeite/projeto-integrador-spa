import React from 'react'
import Header from '../../components/Header/Header'

export default function Reservas({user}) {

    return (
        <div>
            <Header userName={user.name} />
            Reservas
        </div>
    )
}
