import React from 'react'
import './Login.css'

import login_icon from '../Assets/login.png'

export const Login = () => {
  return (
    <div className='body'>
        <div className='container'>
            <div className='header'>
                <img className='login_icon' src={login_icon} alt="login_icon" srcset="" />
                <div className='sign-in-text'> SIGN IN HERE</div>
                <div className='underline'></div>
            </div>
            <div className="inputs">
                <div className="inputemail">
                    <input type="text" name="" id="" placeholder='NIP' />
                </div>
                <div className="inputpassword">
                    <input type="password" name="" id="" placeholder='Password'/>
                </div>
            </div>
            <div className="submit-container">
                <input type="submit" value="LOGIN" />
            </div>
                
        </div>
    </div>
    
  )
}
