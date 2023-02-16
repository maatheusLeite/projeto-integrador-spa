import './App.css';
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import Usuario from './pages/Usuario/Usuario';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

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
        <Route path='/' element={<Home user={user2} />} />
        <Route path='/reservas' element={<Reservas user={user2} />} />
        <Route path='/usuario' element={<Usuario user={user2} />} />
      </Routes>
    </Router>
  );
}

