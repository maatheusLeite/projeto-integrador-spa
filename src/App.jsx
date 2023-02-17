import './App.css';
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import Usuario from './pages/Usuario/Usuario';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CancelarReserva from './pages/CancelarReserva/CancelarReserva';

export default function App() {

  const user = {}
  const reservation = {}

  const user1 = {
    id: 1,
    name: 'Carlos Brown',
    email: 'carlos@gmail.com',
    phone: '11988888888',
    password: '123456'
  }

  const user2 = {
    id: 2,
    name: 'Alex Green',
    email: 'alex@gmail.com',
    phone: '11977777777',
    password: '123456'
  }

  const user4 = {
    id: 4,
    name: 'Helena Blue',
    email: 'helena@gmail.com',
    phone: '11912345678',
    password: '123456' 
  }; 

  return (
    <Router>
      <Routes>
        <Route path='/' state={user1} element={<Home user={user1}/>} />
        <Route path='/reservas' state={user1} element={<Reservas />} />
        <Route path={'/reservas/cancelar'} state={user1} element={<CancelarReserva />} />
        <Route path='/usuario' state={user1} element={<Usuario />} />
      </Routes>
    </Router>
  );
}

