import React from 'react'
import './User.css'
import { useState } from 'react'
import Modal from 'react-modal'

export const User = () => {
    const [visible, setvisible]= useState(false)
    return (
        <div className='container'>
            <button  className='add' onClick={()=>setvisible(true)}>Tambah Data</button>
            <div className="sub-container">
                <Modal isOpen={visible} onRequestClose={()=>setvisible(false)} style={
                    {
                        content:{
                            width: "700px",
                            height: "500px",
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
