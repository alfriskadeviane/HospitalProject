import React, { useContext } from 'react'
import './User.css'
import { useState } from 'react'
import Modal from 'react-modal'
import plus from '../Assets/plus.png'
import btnclose from '../Assets/close.png'
import { AuthContext } from '../../Context/Authcontex'


export const User = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [visible, setvisible]= useState(false)
    return (
        <div className='container-fluid'>
            <h1>DATA KARYAWAN</h1>   
            <img src={plus} alt="" className='add-btn' onClick={()=>setvisible(true)}/>
            <table className="table table-striped-columns md-3">
                <thead>
                    <tr>
                    <th scope="col">NIP</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Ruangan</th>
                    <th scope="col">Jabatan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@fat</td>
                    </tr>
                </tbody>
            </table> 
            <div className="sub-container">
                <Modal isOpen={visible} onRequestClose={()=>setvisible(false)} style={
                    {
                        content:{
                            width: "1100px",
                            height: "600px",
                            margin: "auto",

                        }
                    
                    }
                } >

                    <div className='close-btn'>
                            <img src={btnclose} alt="" srcset="" className='cls-btn' onClick={()=>setvisible(false)}/>
                        </div>
                    <div className="new-user">NEW USER</div>
                    
                    <form action="">
                        <div className="mb-3 row">
                            <label for="inputNIP" class="col-sm-2 col-form-label">NIP</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputName" class="col-sm-2 col-form-label">Nama</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                            <input type="email" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputRole" class="col-sm-2 col-form-label">Role</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputJabatan" class="col-sm-2 col-form-label">Jabatan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputRuangan" class="col-sm-2 col-form-label">Ruangan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword"/>
                            </div>
                        </div>
                        <div className="submit">
                            <button type="button" className="btn btn-success" id="submit">Submit</button>
                        </div>
                        
                        
                        
                    </form>
                       
                     
                    

                </Modal>
            </div>
            
        </div>
    )
}
