import React, { useState } from 'react'
import './Entrar.css'
import Header from '../../components/Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Entrar() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [passwordType, setPasswordType] = useState('Password')

    const location = useLocation()
    const user = location.state
    
    const navigate = useNavigate()

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/users"
    })
    
    function handleSubmit(event) {
        event.preventDefault()
        logIn()
    }

    async function logIn() {
        let response = await axiosClient.get()
        const users = response.data

        const userToBeLogedIn = { email: email, password: password }

        users.forEach(user => {
            validateUser(user, userToBeLogedIn)
        })        
    }

    function validateUser(user, testUser) {
        if (user.email === testUser.email && user.password === testUser.password) {  
            logUser(user)
        }
    }

    function logUser(user) {
        if (user !== '') {
            navigate('/', { state: user })
        }
    }

    function visiblePassword() {
        (visible) ? 
            setPasswordType('password')
        :
            setPasswordType('text')

        setVisible(!visible)
    }

    return (
        <div>
            <Header user={user}/>
            
            <form 
                action="" 
                onSubmit={handleSubmit}
                className='form-container'    
            >
                <h2 className='form-title'> Entrar </h2>

                <div className='input-container-2'>
                    <label htmlFor=""> Email: </label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} 
                        className='input' 
                    />
                </div>
                
                <div className='input-container-2'>
                    <label htmlFor=""> Senha: </label>

                    <div className='password-container'>
                        <input 
                            type={passwordType} 
                            id='password' 
                            name='password' 
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                            className='input'
                        />

                        <div className='btn-visible'>
                            {
                                (visible) ?
                                    <Visibility onClick={() => visiblePassword()} />
                                :
                                    <VisibilityOff onClick={() => visiblePassword()} />
                            }
                        </div>
                    </div>
                </div>

                <button 
                    className='btn-action'
                    onClick={() => handleSubmit}
                > Entrar </button>
            </form>
        </div>
    )
}
