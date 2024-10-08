// import logo from './logo.svg';
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Login } from './Components/Login/Login';
import { User } from './Components/User/User';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Ruangan } from './Components/Ruangan/Ruangan';
import { Cuti } from './Components/Cuti/Cuti';
import { Navbar } from './Components/Navbar/Navbar';

function App() {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
    <div className="app">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar toggleSidebar={toggleSidebar}/>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<User />} />
            <Route path="/ruangan" element={<Ruangan />} />
            <Route path="/cuti" element={<Cuti />} />
            
          </Routes>
        </div>

      </div>
    </div>
  </Router>
  );
}

export default App;
