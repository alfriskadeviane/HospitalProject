import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { AuthContext } from '../../Context/Authcontex'

import login_icon from '../Assets/login.png'
import logo from '../Assets/logo.png'

export const Login = () => {
    const [nip, setNip] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const [error, setError]= useState('');
    const navigate = useNavigate();
    

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(nip, password);
        navigate('/pengguna');
      };


  return (
    <div className='body'>
        <div className='container'>
            <div className='header'>
                <img className='login_icon' src={logo} alt="login_icon"  />
                <div className='sign-in-text'> Silahkan Masuk</div>
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
                    <input type="submit" value="MASUK" />
                </div>
            </form>
            
                
        </div>
    </div>
    
  )
}
