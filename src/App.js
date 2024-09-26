// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Components/Login/Login';
import { User } from './Components/User/User';
import { Navbar } from './Components/Navbar/Navbar';

function App() {
  return (
    <Router>
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/users" element={<User />} />
          <Route path="/settings" element={<Login />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
