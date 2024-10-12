import React from 'react'
import './Ruangan.css'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import plus from '../Assets/plus.png'
import btnclose from '../Assets/close.png'
import {db} from '../../Config/Firebaseconfig'
import { doc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'


export const Ruangan = () => {
    const [selectedUser, setSelectedUser] = useState(null); // For storing selected user data for update
    const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal
    const [isEditing, setIsEditing] = useState(false); // To distinguish between adding and updating
    const [roomID, setRoomId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomLead, setRoomLead] = useState('');
    const [id, setId] = useState('');
    const [fetchData, setFetchData] =useState([]);

     // Function to handle modal close
     const closeModal = () => {
        setRoomId('')
        setRoomName('')
        setRoomLead('')
        setIsModalOpen(false);
    };

    // creating db ref
    const dbref = collection(db, "HospitalRoom")

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
        setRoomId(matchId.RoomID)
        setRoomName(matchId.RoomName)
        setRoomLead(matchId.RoomLead)
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
                    RoomID:roomID, RoomName: roomName, RoomLead: roomLead
                })
                alert("Data Berhasil Terubah")
            } catch (error) {
                alert(error,"Data Gagal Terubah")
            }
    
        } else {
        // Add new user
            const addata =  await addDoc(dbref,{RoomID:roomID, RoomName: roomName, RoomLead: roomLead})
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
            <h1>DATA RUANGAN</h1>
            {/* <button  className='add' onClick={()=>setvisible(true)}> <img src={plus} alt="" className='add-btn' /></button> */}
            <img src={plus} alt="" className='add-btn' onClick={handleAddUser}/>
            <div><p>   </p></div>
            <table className="table table-striped-columns md-3">
                <thead>
                    <tr>
                    <th scope="col">Kode Ruangan</th>
                    <th scope="col">Name Ruangan</th>
                    <th scope="col">Kepala Ruangan</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fetchData.map((data)=>{
                            return(
                                <>
                                <tr>
                                    <th scope="row">{data.RoomID}</th>
                                    <td>{data.RoomName}</td>
                                    <td>{data.RoomLead}</td>
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
                    <div className="new-user">{isEditing ? 'Update Ruangan' : 'Add Ruangan'}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <label for="inputNIP" class="col-sm-2 col-form-label">Kode Ruangan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputNIP" value={roomID} onChange={(e)=> setRoomId(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputName" class="col-sm-2 col-form-label">Nama Ruangan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputName" value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                            <label for="inputRole" class="col-sm-2 col-form-label">Kepala Ruangan</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputRole" value={roomLead} onChange={(e) => setRoomLead(e.target.value)}/>
                            </div>
                        </div>
                        
                        
                        <div className="submit">
                            <button type="submit" className="btn btn-success" id="submit">{isEditing ? 'Update' : 'Add'} Ruangan</button>
                        </div>
                        
                    </form>
                </Modal>
                )} 
            </div>
            
        </div>
    )
}
