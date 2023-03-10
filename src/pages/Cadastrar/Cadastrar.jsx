import React, { useState } from 'react'
import './Cadastrar.css'
import Header from '../../components/Header/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import validator from 'validator' 

export default function Entrar() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [DDD, setDDD] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)
    const [visible, setVisible] = useState(false)
    const [passwordType, setPasswordType] = useState('password')
    const [nameErrorMessage, setNameErrorMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

    let [invalidEmailCount, setInvalidEmailCount] = useState(0)

    const location = useLocation()
    const user = location.state
    
    const navigate = useNavigate()

    const axiosClient = axios.create({
        baseURL: "http://localhost:8080/users"
    })
    
    function handleSubmit(event) {
        event.preventDefault()
        verifyEmail()
    }

    async function verifyEmail() {
        let response = await axiosClient.get()
        const users = response.data

        users.forEach(user => {
            if(user.email === email.toLowerCase()) {
                setInvalidEmailCount(invalidEmailCount++)
            }
        })
        
        validateEmail()
    }

    function validateEmail() {
        if (invalidEmailCount > 0) {
            setInvalidEmailCount(0)
            setEmailErrorMessage('Este Email já esta sendo utilizado')
            setDisabledButton(true)
        }
        else {
            registerUser()
        }
    }

    async function registerUser() {
        const fullPhone = DDD + phone

        await axiosClient.post('', {
            name: name,
            email: email.toLowerCase(),
            phone: fullPhone,
            password: password
        })
        .then((response) => {
            navigate('/', { state: response.data })
        })
    }

    function handleName(event) {
        let currentName = event.target.value

        setName(currentName)
        checkNameLength(currentName)
    }

    function checkNameLength(name) {
        if (name.length < 5) {
            setDisabledButton(true)
            setNameErrorMessage("Nome muito curto")
        }
        else {
            setNameErrorMessage("") 
            allAttributesAreValid()
        }
    }

    function allAttributesAreValid() {
        if (name === '' || email === '' || password === '' || DDD === '' || phone === '') {
           setDisabledButton(true)
        }
        else {
            setDisabledButton(false)
        }
    }

    function handleEmail(event) {
        let currentEmail = event.target.value

        setEmail(currentEmail)
        checkEmail(currentEmail)
    }

    function checkEmail(email) {
        if (validator.isEmail(email)) {
            setEmailErrorMessage("") 
            allAttributesAreValid()
        } 
        else {
            setEmailErrorMessage('Email invalido')
            setDisabledButton(true)
        }
    }

    function handleDDD(event) {
        let currentDDD = event.target.value

        setDDD(currentDDD)
        checkDDD(currentDDD)
    }

    function checkDDD(ddd) {
        if (ddd.length !== 2) {
            setDisabledButton(true)
            setPhoneErrorMessage("DDD invalido")
        }
        else {
            setPhoneErrorMessage("") 
            allAttributesAreValid()
        }
    }

    function handlePhone(event) {
        let currentPhone = event.target.value

        setPhone(currentPhone)
        checkPhone(currentPhone)
    }

    function checkPhone(phone) {
        if(phone.length < 8 || phone.length > 9) {
            setPhoneErrorMessage("Telefone Invalido")
            setDisabledButton(true)
        }
        else {
            setPhoneErrorMessage("") 
            allAttributesAreValid()
        }
    }    

    function handlePassword(event) {
        let currentPassword = event.target.value
        setPassword(currentPassword)
        checkPasswordLength(currentPassword)
    }
    
    function checkPasswordLength(password) {
        if(password.length < 8) {
            setPasswordErrorMessage("Senha muito curta")
            setDisabledButton(true)
        }
        else {
            setPasswordErrorMessage("") 
            allAttributesAreValid()
        }
    }

    function isPasswordVisible() {
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
                className='register-container'    
            >
                <h2 className='register-title'> Cadastrar </h2>

                <div className='register-input-container'>
                    <label htmlFor=""> Nome completo: </label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        placeholder='Digite seu nome completo'
                        value={name}
                        onChange={(event) => handleName(event)} 
                        className='register-input' 
                    />
                </div>

                <span className='error-message-2'> {nameErrorMessage} </span>

                <div className='register-input-container'>
                    <label htmlFor=""> Email: </label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(event) => handleEmail(event)} 
                        className='register-input' 
                    />
                </div>

                <span className='error-message-2'> {emailErrorMessage} </span>

                <div className='register-input-container'>
                    <label htmlFor=""> Telefone: </label>
                    <div className='phone-input-container'>
                        <input 
                            type='tel'
                            id='ddd' 
                            name='ddd' 
                            placeholder='ddd'
                            value={DDD}
                            onChange={(event) => handleDDD(event)} 
                            className='ddd-input' 
                        />

                        <input 
                            type='tel'
                            id='phone' 
                            name='phone' 
                            placeholder='Insira seu telefone'
                            value={phone}
                            onChange={(event) => handlePhone(event)} 
                            className='phone-input' 
                        />
                    </div>
                </div>
                
                <span className='error-message-2'> {phoneErrorMessage} </span>

                <div className='register-input-container'>
                    <label htmlFor=""> Senha: </label>

                    <div className='password-container'>
                        <input 
                            type={passwordType} 
                            id='password' 
                            name='password' 
                            placeholder='Digite sua senha'
                            value={password}
                            onChange={(event) => handlePassword(event)} 
                            className='register-input'
                        />

                        <div className='btn-visible'>
                            {
                                (visible) ?
                                    <Visibility onClick={() => isPasswordVisible()} />
                                :
                                    <VisibilityOff onClick={() => isPasswordVisible()} />
                            }
                        </div>
                    </div>
                </div>
                        
                <span className='error-message-2'> {passwordErrorMessage} </span>

                <button 
                    disabled={disabledButton}
                    className='btn-action'
                    onClick={() => handleSubmit}
                > Cadastrar </button>

                <Link to='/entrar' className='link color-2'> Já possuo cadastro </Link>
            </form>
        </div>
    )
}
