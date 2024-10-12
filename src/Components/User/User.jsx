import React, { useEffect } from 'react'
import './User.css'
import { useState } from 'react'
import Modal from 'react-modal'
import plus from '../Assets/plus.png'
import btnclose from '../Assets/close.png'
// import { AuthContext } from '../../Context/Authcontex'
import {db} from '../../Config/Firebaseconfig'
import { doc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'


export const User = () => {
    const [selectedUser, setSelectedUser] = useState(null); // For storing selected user data for update
    const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal
    const [isEditing, setIsEditing] = useState(false); // To distinguish between adding and updating
    const [nip, setNIP] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [ruangan, setRuangan] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
    const [fetchData, setFetchData] =useState([]);

    // Function to handle modal close
    const closeModal = () => {
        setNIP('')
        setName('')
        setEmail('')
        setRole('')
        setJabatan('')
        setRuangan('')
        setPassword('')
        setIsModalOpen(false);
    };

    // creating db ref
    const dbref = collection(db, "HospitalProject")

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

     // Handle Add User button click
    const handleAddUser = () => {
        setSelectedUser(null); // Clear selected user if any
        setIsEditing(false);
        setIsModalOpen(true); // Open modal for adding new user
    };

    // Handle Update click
    const handleUpdateClick = (user) => {
        setSelectedUser(user); // Set selected user to be updated
        setIsEditing(true);
        setIsModalOpen(true); // Open modal for editing
        {passData(user.id)}
    };

    //pass update data to form
    const passData= async (id) =>{
        const matchId= fetchData.find((data)=>{
            return data.id === id
            
        })
        console.log(matchId)
        setNIP(matchId.NIP)
        setName(matchId.Name)
        setEmail(matchId.Email)
        setRole(matchId.Role)
        setJabatan(matchId.Jabatan)
        setRuangan(matchId.Ruangan)
        setPassword(matchId.Password)
        setId(matchId.id)
    }

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

     // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
        // Update user
            try {
                const userDocRef = doc(dbref, id);
                const updateDocRef=await updateDoc(userDocRef, {
                    NIP:nip, Name: name, Email: email, Role: role, Jabatan: jabatan, Ruangan: ruangan, Password: password
                })
                alert("Data Berhasil Terubah")
            } catch (error) {
                alert(error,"Data Gagal Terubah")
            }
    
        } else {
        // Add new user
            const addata =  await addDoc(dbref,{NIP:nip, Name: name, Email: email, Role: role, Jabatan: jabatan, Ruangan: ruangan, Password: password})
            console.log("ADD: ", addata)
                if (addata) {
                    alert("Data Berhasil Tersimpan")
                }else{
                    alert("Data Gagal Tersimpan")
                }
        }
        closeModal(); // Close the modal
        fetch(); // Refresh users after adding/updating
        
    };
    
    return (
        <div className='container-fluid'>
            <h1>DATA KARYAWAN</h1>   
            <img src={plus} alt="" className='add-btn' onClick={handleAddUser}/>
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
                                        <button className='btn btn-success'onClick={()=>handleUpdateClick(data)}>Edit</button>
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
             {isModalOpen &&(
  
                <Modal isOpen={isModalOpen} onRequestClose={()=>setIsModalOpen(false)} isEditing={isEditing} user={selectedUser} fetchData={fetchData}
                // isOpen={visible} onRequestClose={()=>setvisible(false)}
                 style={
                    {
                        content:{
                            width: "1100px",
                            height: "600px",
                            margin: "auto",

                        }
                    
                    }
                } >

                    <div className='close-btn'>
                            <img src={btnclose} alt="" srcset="" className='cls-btn' onClick={closeModal}/>
                        </div>
                    {/* <div className="new-user">USER</div> */}
                    <div className="new-user">{isEditing ? 'Update User' : 'Add User'}</div>
                    <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="btn btn-success" id="submit">{isEditing ? 'Update' : 'Add'} User</button>
                        </div>
                        
                    </form>
                </Modal>
             )} 
            </div>
            
        </div>
    )
}
