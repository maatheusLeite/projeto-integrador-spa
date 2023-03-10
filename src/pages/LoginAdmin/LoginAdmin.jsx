import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginAdmin.css'

export default function LoginAdmin() {
    
    const [loginName, setLoginName] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [passwordType, setPasswordType] = useState('Password')
    const [errorMessage, setErrorMessage] = useState('')
    
    const navigate = useNavigate()

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/admins"
    })
    
    function handleSubmit(event) {
        event.preventDefault()
        setErrorMessage('')
        logIn()
    }

    async function logIn() {
        let response = await axiosClient.get()
        const admins = response.data

        const adminToBeLogedIn = { loginName: loginName, password: password }

        admins.forEach(admin => {
            validateAdmin(admin, adminToBeLogedIn)
        })      
        
        setErrorMessage("Identificador ou senha incorretos")
    }

    function validateAdmin(admin, testAdmin) {
        if (admin.loginName === testAdmin.loginName && admin.password === testAdmin.password) {  
            logAdmin(admin)
        }
    }

    function logAdmin(admin) {
        if (admin !== '') {
            navigate('/admin/reservas', { state: admin })
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
        <div className='main'>
            <h2 className='logo-large'> 
                <span> DON </span>
                <span> FERRARO </span>    
            </h2>

            <form 
                action="" 
                onSubmit={handleSubmit}
                className='admin-form-container'    
            >
                <h2 className='admin-form-title'> Entrar </h2>

                <div className='admin-input-container'>
                    <label htmlFor=""> Identificador: </label>
                    <input 
                        type='text' 
                        id='loginName' 
                        name='loginName' 
                        placeholder='Digite seu identificador'
                        value={loginName}
                        onChange={(event) => setLoginName(event.target.value)} 
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

                    <span className='error-message'> {errorMessage} </span>
                </div>

                <button 
                    className='admin-btn-action'
                    onClick={() => handleSubmit}
                > Entrar </button>

            </form>
        </div>
    )
}
