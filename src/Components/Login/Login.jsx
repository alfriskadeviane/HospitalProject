import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { AuthContext } from '../../Context/Authcontex'

import login_icon from '../Assets/login.png'

export const Login = () => {
    const [nip, setNip] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(nip, password);
        navigate('/users');
      };

  return (
    <div className='body'>
        <div className='container'>
            <div className='header'>
                <img className='login_icon' src={login_icon} alt="login_icon" srcset="" />
                <div className='sign-in-text'> SIGN IN HERE</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleLogin}>
                <div className="inputs">
                    <div className="inputemail">
                        <input type="text" name="" id="" placeholder='NIP' value={nip} onChange={(e) => setNip(e.target.value)}/>
                    </div>
                    <div className="inputpassword">
                        <input type="password" name="" id="" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="submit-container">
                    <input type="submit" value="LOGIN" />
                </div>
            </form>
            
                
        </div>
    </div>
    
  )
}
