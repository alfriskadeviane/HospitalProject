import React from 'react'
import './User.css'
import { useState } from 'react'
import Modal from 'react-modal'
import plus from '../Assets/plus.png'

export const User = () => {
    const [visible, setvisible]= useState(false)
    return (
        <div className='container'>
            <h1>DATA KARYAWAN</h1>
            {/* <button  className='add' onClick={()=>setvisible(true)}> <img src={plus} alt="" className='add-btn' /></button> */}
            <img src={plus} alt="" className='add-btn' onClick={()=>setvisible(true)}/>
            <div className="sub-container">
                <Modal isOpen={visible} onRequestClose={()=>setvisible(false)} style={
                    {
                        content:{
                            width: "1200px",
                            height: "600px",
                            margin: "auto"

                        }
                    
                    }
                } >
                    <div className="close-con">
                        <button className='btn-close' onClick={()=>setvisible(false)}>X</button>
                    </div>
                    <div className="new-user">NEW USER</div>
                </Modal>
            </div>
            
        </div>
    )
}
