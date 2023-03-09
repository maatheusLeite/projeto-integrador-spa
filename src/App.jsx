import './App.css'
import Home from './pages/Home/Home'
import Reservas from './pages/Reservas/Reservas'
import Usuario from './pages/Usuario/Usuario'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CancelarReserva from './pages/CancelarReserva/CancelarReserva'
import Entrar from './pages/Entrar/Entrar'
import Cadastrar from './pages/Cadastrar/Cadastrar'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reservas' element={<Reservas />} />
        <Route path={'/reservas/cancelar'} element={<CancelarReserva />} />
        <Route path='/usuario' element={<Usuario />} />
        <Route path='/cadastrar' element={<Cadastrar />} />
        <Route path='/entrar' element={<Entrar />} />
      </Routes>
    </Router>
  )
}

