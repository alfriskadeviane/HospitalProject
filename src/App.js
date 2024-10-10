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
import { AuthProvider } from './Context/Authcontex';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <AuthProvider>
    <Router>
    <div className="app">
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar toggleSidebar={toggleSidebar}/>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<ProtectedRoute><User /></ProtectedRoute>} />
            <Route path="/ruangan" element={<ProtectedRoute><Ruangan /></ProtectedRoute>} />
            <Route path="/cuti" element={<ProtectedRoute><Cuti /></ProtectedRoute>} />
            
          </Routes>
        </div>

      </div>
    </div>
  </Router>
  </AuthProvider>
  );
}

export default App;
