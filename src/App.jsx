import './App.css';
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {

  const user1 = {
    name: 'Helena Gray',
    email: 'helena@gmail.com'
  };

  const user2 = {}

  const reservation1 = {
    id: 5,
    peopleAmount: 8,
    generationMoment: '2022-06-23T08:02:07Z',
    bookedDate: '2022-06-23T18:00:00Z'
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

