import React from 'react'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom';

export default function Reservas({user}) {

    const navigate = useNavigate();

    return (
        <div>
            <Header userName={user.name} />
            Reservas
        </div>
    )
}
