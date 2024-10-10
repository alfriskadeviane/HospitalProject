import React, { useContext, useEffect } from 'react'
import './User.css'
import { useState } from 'react'
import Modal from 'react-modal'
import plus from '../Assets/plus.png'
import btnclose from '../Assets/close.png'
import { AuthContext } from '../../Context/Authcontex'
import {db} from '../../Config/Firebaseconfig'
import { doc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'


export const User = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [visible, setvisible]= useState(false);
    const [nip, setNIP] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [ruangan, setRuangan] = useState('');
    const [password, setPassword] = useState('');
    const [fetchData, setFetchData] =useState([]);

    // Function to handle modal close
    const closeModal = () => {
        setvisible(false);
    };

    // creating db ref
    const dbref = collection(db, "HospitalProject")
    //storing data to db
    const add = async () =>{
        const addata =  await addDoc(dbref,{NIP:nip, Name: name, Email: email, Role: role, Jabatan: jabatan, Ruangan: ruangan, Password: password})
        if (addata) {
            alert("Data Berhasil Tersimpan")
        }else{
            alert("Data Gagal Tersimpan")
        }
        closeModal();
        fetch()
    }
    // fetching data from db
    const fetch= async()=>{
        const snapshot = await getDocs(dbref)
        const fetchData=  snapshot.docs.map((doc =>({id: doc.id, ...doc.data()})))
        setFetchData(fetchData)
        console.log(fetchData)
    }
    useEffect(()=>{
        fetch()
    },[])
    // delete data fro db
    const del = async(id)=>{
        const delref= doc(dbref, id)
        console.log("data: ", delref)
        try{
            await deleteDoc(delref)
            alert("Data Berhasil Terhapus")
           
        }
        catch (error){
            alert(error)
            
        }
        closeModal();
        fetch()
    }
    
    return (
        <div className='container-fluid'>
            <h1>DATA KARYAWAN</h1>   
            <img src={plus} alt="" className='add-btn' onClick={()=>setvisible(true)}/>
            <div><p>   </p></div>
            <table className="table table-striped-columns md-3">
                <thead>
                    <tr>
                    <th scope="col">NIP</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Ruangan</th>
                    <th scope="col">Jabatan</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fetchData.map((data)=>{
                            return(
                                <>
                                <tr>
                                    <th scope="row">{data.NIP}</th>
                                    <td>{data.Name}</td>
                                    <td>{data.Role}</td>
                                    <td>{data.Ruangan}</td>
                                    <td>{data.Jabatan}</td>
                                    <td>
                                        <button className='btn btn-success'>Edit</button>
                                        <button className='btn btn-danger' onClick={()=> del(data.id)}>Delete</button>
                                    </td>
                                </tr>
                                </>
                            )
                        })
                    }
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
                            <input type="text" class="form-control" id="inputNIP" value={nip} onChange={(e)=> setNIP(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputName" class="col-sm-2 col-form-label">Nama</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputRole" class="col-sm-2 col-form-label">Role</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputRole" value={role} onChange={(e) => setRole(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputJabatan" class="col-sm-2 col-form-label">Jabatan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputJabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputRuangan" class="col-sm-2 col-form-label">Ruangan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword" value={ruangan} onChange={(e) => setRuangan(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="submit">
                            <button type="button" className="btn btn-success" id="submit" onClick={add}>Submit</button>
                        </div>
                        
                        
                        
                    </form>
                       
                     
                    

                </Modal>
            </div>
            
        </div>
    )
}
