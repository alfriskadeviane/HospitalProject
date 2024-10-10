
import React, { useState, useContext } from "react";
import "./Sidebar.css";

import icnuser from '../Assets/user.png'
import icnroom from '../Assets/room.png'
import icncalendar from '../Assets/calendar.png'
import icnlogout from '../Assets/logout.png'
import { AuthContext } from "../../Context/Authcontex";
import { Link } from "react-router-dom";


export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {isAuthenticated, logout}= useContext(AuthContext);
  return (
    <div>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
        {isAuthenticated?(
          <>

          <li>
            <Link to='/users' className="mb-3 row">
              <img src={icnuser} alt="" className="icon" />
              Data User
            </Link>
          </li>
          <li>
            <Link to='/ruangan' className="mb-3 row">
              <img src={icnroom} alt="" className="icon" />
              Data Ruangan
            </Link>
          </li>
          <li>
            <Link to='/cuti' className="mb-3 row">
              <img src={icncalendar} alt="" className="icon" />
              Data Cuti
            </Link>
          </li>
          <li>
            <div className="mb-3 row" onClick={logout} id="logut">
            <img src={icnlogout} alt="" className="icon" />
              Logout
            </div>
          </li>
          </>
        ):(
          <></>
        )
      }
          
        </ul>
      </nav>
  </div>
    
  )
}