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
        <li><a href="#login">Login</a></li>
        <li><a href="#services">Data User</a></li>
        <li><a href="#about">Data Ruangan</a></li>
        <li><a href="#contact">Data Cuti</a></li>
      </ul>
    </nav>
  </div>
    
  )
}