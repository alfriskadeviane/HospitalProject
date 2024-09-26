// Navbar.js
import React, { useState } from "react";
import "./Navbar.css";
// import { useState } from 'react'

import menu_icon from '../Assets/menu.png'


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
    <img src={menu_icon} className="menu-btn" onClick={toggleNavbar}/>

    <nav className={`navbar ${isOpen ? "open" : ""}`}>
    <img src={menu_icon} className="menu-btn" onClick={toggleNavbar}/>
      <ul>
        <li><a href="/login">Login</a></li>
        <li><a href="/users">Data User</a></li>
        <li><a href="/ruangan">Data Ruangan</a></li>
        <li><a href="/cuti">Data Cuti</a></li>
      </ul>
    </nav>
  </div>
    
  )
}