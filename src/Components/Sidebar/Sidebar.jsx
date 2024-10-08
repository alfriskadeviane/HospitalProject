
import React, { useState, useContext } from "react";
import "./Sidebar.css";

import icnuser from '../Assets/user.png'
import icnroom from '../Assets/room.png'
import icncalendar from '../Assets/calendar.png'
import icnlogout from '../Assets/logout.png'
import { AuthContext } from "../../Context/Authcontex";


export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const logout= useContext(AuthContext)
  return (
    <div>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* <img src={menu_icon} className="menu-btn" onClick={toggleSidebar}/> */}
        <ul>
          {/* <li>
            <a href="/login">
                <img src="" alt="" />
                Login
            </a>
          </li> */}
          <li>
            <a href="/users" className="mb-3 row">
              <img src={icnuser} alt="" className="icon" />
              Data User
            </a>
          </li>
          <li>
            <a href="/ruangan" className="mb-3 row">
              <img src={icnroom} alt="" className="icon" />
              Data Ruangan
            </a>
          </li>
          <li>
            <a href="/cuti" className="mb-3 row">
              <img src={icncalendar} alt="" className="icon" />
              Data Cuti
            </a>
          </li>
          <li>
            <a href="/cuti" className="mb-3 row">
              <img src={icnlogout} alt="" className="icon" onClick={logout} />
              Logout
            </a>
          </li>
        </ul>
      </nav>
  </div>
    
  )
}