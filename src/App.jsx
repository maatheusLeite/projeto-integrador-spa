import './App.css';
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

  const user1 = {
    name: 'Helena Gray',
    email: 'helena@gmail.com'
  }; 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home user={user1} />} />
        <Route path='/reservas' element={<Reservas user={user1} />} />
      </Routes>
    </Router>
  );
}

