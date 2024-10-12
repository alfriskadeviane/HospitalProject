import React from 'react'
import './Cuti.css'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import plus from '../Assets/plus.png'
import btnclose from '../Assets/close.png'
import {db} from '../../Config/Firebaseconfig'
import { doc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

export const Cuti = () => {
    const [selectedUser, setSelectedUser] = useState(null); // For storing selected user data for update
    const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal
    const [isEditing, setIsEditing] = useState(false); // To distinguish between adding and updating
    const [leaveID, setLeaveId] = useState('');
    const [leaveName, setLeaveName] = useState('');
    const [leaveAmt, setLeaveAmt] = useState('');
    const [id, setId] = useState('');
    const [fetchData, setFetchData] =useState([]);

    // Function to handle modal close
    const closeModal = () => {
        setLeaveId('')
        setLeaveName('')
        setLeaveAmt('')
        setIsModalOpen(false);
    };

    // creating db ref
    const dbref = collection(db, "HospitalLeaves")

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
        setLeaveId(matchId.LeaveID)
        setLeaveName(matchId.LeaveName)
        setLeaveAmt(matchId.LeaveAmt)
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
                    LeaveID:leaveID, LeaveName: leaveName, LeaveAmt: leaveAmt
                })
                alert("Data Berhasil Terubah")
            } catch (error) {
                alert(error,"Data Gagal Terubah")
            }
    
        } else {
        // Add new user
            const addata =  await addDoc(dbref,{LeaveID:leaveID, LeaveName: leaveName, LeaveAmt: leaveAmt})
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
        <div className='container'>
            <h1>DATA CUTI</h1>
            <img src={plus} alt="" className='add-btn' onClick={handleAddUser}/>
            <div><p>   </p></div>
            <table className="table table-striped-columns md-3">
                <thead>
                    <tr>
                    <th scope="col">Kode Cuti</th>
                    <th scope="col">Name Cuti</th>
                    <th scope="col">Jumlah Cuti</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fetchData.map((data)=>{
                            return(
                                <>
                                <tr>
                                    <th scope="row">{data.LeaveID}</th>
                                    <td>{data.LeaveName}</td>
                                    <td>{data.LeaveAmt}</td>
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
                <Modal isOpen={isModalOpen} onRequestClose={()=>setIsModalOpen(false)} isEditing={isEditing} user={selectedUser} fetchData={fetchData} style={
                    {
                        content:{
                            width: "1100px",
                            height: "600px",
                            margin: "auto"

                        }
                    
                    }
                } >
                    <div className="close-con">
                    <img src={btnclose} alt="" srcset="" className='cls-btn' onClick={closeModal}/>
                    </div>
                    <div className="new-user">{isEditing ? 'Update Cuti' : 'Add Cuti'}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <label for="inputNIP" class="col-sm-2 col-form-label">Kode Cuti</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputNIP" value={leaveID} onChange={(e)=> setLeaveId(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="inputName" class="col-sm-2 col-form-label">Nama Cuti</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputName" value={leaveName} onChange={(e) => setLeaveName(e.target.value)}/>
                            </div>
                        </div>
                        
                        <div className="mb-3 row">
                            <label for="inputRole" class="col-sm-2 col-form-label">Jumlah Cuti</label>
                            <div className="col-sm-10">
                            <input type="text" class="form-control" id="inputRole" value={leaveAmt} onChange={(e) => setLeaveAmt(e.target.value)}/>
                            </div>
                        </div>
                        
                        
                        <div className="submit">
                            <button type="submit" className="btn btn-success" id="submit">{isEditing ? 'Update' : 'Add'} Cuti</button>
                        </div>
                        
                    </form>
                </Modal>
                
            )}
            </div>
            
        </div>
    )
}
