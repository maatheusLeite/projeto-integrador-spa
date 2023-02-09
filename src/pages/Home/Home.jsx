import React from 'react'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'

export default function Home({user}) {
    const navigate = useNavigate()

    return (
        <div>
            <Header userName={user.name} />
            <main>
                HOME
            </main>
        </div>
    )
}
