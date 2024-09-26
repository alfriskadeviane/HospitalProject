// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Components/Login/Login';
import { User } from './Components/User/User';
import { Navbar } from './Components/Navbar/Navbar';
import { Ruangan } from './Components/Ruangan/Ruangan';
import { Cuti } from './Components/Cuti/Cuti';

function App() {
  return (
    <Router>
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<User />} />
          <Route path="/ruangan" element={<Ruangan />} />
          <Route path="/cuti" element={<Cuti />} />
          
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
