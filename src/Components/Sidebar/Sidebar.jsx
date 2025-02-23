
import React, { useState, useContext } from "react";
import "./Sidebar.css";

import icnuser from '../Assets/user.png'
import icnroom from '../Assets/room.png'
import icncalendar from '../Assets/calendar.png'
import icnlogout from '../Assets/logout.png'
import { AuthContext } from "../../Context/Authcontex";
import { Link } from "react-router-dom";
import icnleave from '../Assets/leave.png'
import icnjobsch from '../Assets/job-schedule.png'


export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {isAuthenticated, logout}= useContext(AuthContext);
  return (
    <div>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <ul>
        {isAuthenticated?(
          <>

          <li>
            <Link to='/pengguna' className="mb-3 row">
              <img src={icnuser} alt="" className="icon" />
              Data Karyawan
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
            <Link to='/cuti-karyawan' className="mb-3 row">
              <img src={icnleave} alt="" className="icon" />
              Data Cuti Karyawan
            </Link>
          </li>
          <li>
            <Link to='/ubah-jadwal' className="mb-3 row">
              <img src={icnjobsch} alt="" className="icon" />
              Data Ubah Jadwal
            </Link>
          </li>
          <li>
            <div className="mb-3 row" onClick={logout} id="logut">
            <img src={icnlogout} alt="" className="icon" />
              Keluar
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