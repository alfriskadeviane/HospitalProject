import React from 'react'
import './UbahJadwal.css'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import btnclose from '../Assets/close.png'
import {db} from '../../Config/Firebaseconfig'
import { doc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

export const UbahJadwal = () => {
    const [selectedUser, setSelectedUser] = useState(null); // For storing selected user data for update
    const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal
    const [isEditing, setIsEditing] = useState(false); // To distinguish between adding and updating
    const [Name, setName] = useState('');
    const [Room, setRoom] = useState('');
    const [Date, setDate] = useState('');
    const [Status, setStatus] = useState('');
    const [Replacement, setReplacement] = useState('');
    const [Shift, setShift] = useState('');
    const [NextShift, setNextShift] = useState('');
    const [id, setId] = useState('');
    const [fetchData, setFetchData] =useState([]);

     // Function to handle modal close
     const closeModal = () => {
        setName('')
        setDate('')
        setRoom('')
        setReplacement('')
        setStatus('')
        setShift('')
        setNextShift('')

        setIsModalOpen(false);
    };

    // creating db ref
    const dbref = collection(db, "changeShift")

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
        setName(matchId.employee.Name)
        setDate(matchId.currentMonth)
        setRoom(matchId.Room)
        setStatus(matchId.approve)
        setReplacement(matchId.personValue.Name)
        setShift(matchId.shift)
        setNextShift(matchId.scheduleValue.shift)
        setId(matchId.id)
    }

  return (
    <div className='container'>
    <h1>DATA PERUBAHAN JADWAL</h1>
    <div><p>   </p></div>
    <table className="table table-striped-columns md-3">
        <thead>
            <tr>
            <th scope="col" className='text-center'>Tanggal Pengajuan</th>
            <th scope="col" className='text-center'>Nama</th>
            <th scope="col" className='text-center'>Ruangan</th>
            <th scope="col" className='text-center'>Sesi Pengganti</th>
            <th scope="col" className='text-center'>Pengganti</th>
            <th scope="col" className='text-center'>Status</th>
            <th scope="col" className='text-center'>Aksi</th>
            </tr>
        </thead>
        <tbody>
            {
                fetchData.map((data)=>{
                    return(
                        <>
                        <tr>
                            <td>{data.currentMonth}</td>
                            <td>{data.employee.Name}</td>
                            <td>{data.Room}</td>
                            <td>{data.scheduleValue.shift}</td>
                            <td>{data.personValue.Name}</td>
                            <td>{data.approve? "disetujui" : "belum disetujui"}</td>
                            
                            <td>
                                <button className='btn btn-success'onClick={()=>handleUpdateClick(data)}>Detail</button>
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
                    width: "900px",
                    height: "600px",
                    margin: "auto",

                }
            
            }
        } >
            <div className="close-con">
            <img src={btnclose} alt=""  className='cls-btn' onClick={closeModal}/>
            </div>
            <div className="new-user">Detail Cuti Karyawan</div>
            <form>
                <div className="mb-3 row">
                    <label for="inputNIP" class="col-sm-2 col-form-label">Tanggal</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputNIP" disabled={true}    value={Date} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputNIP" class="col-sm-2 col-form-label">Nama</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputNIP" disabled={true}    value={Name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputName" class="col-sm-2 col-form-label">Ruangan</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputName" disabled={true} value={Room} onChange={(e) => setRoom(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Sesi Sebelum</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Shift} onChange={(e) => setShift(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputName" class="col-sm-2 col-form-label">Sesi Setelah</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputName" disabled={true} value={NextShift} onChange={(e) => setNextShift(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Pengganti</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Replacement} onChange={(e) => setReplacement(e.target.value)}/>
                    </div>
                </div>
             
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Ruangan</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Room} onChange={(e) => setRoom(e.target.value)}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Status? "disetujui" : "belum disetujui"} onChange={(e) => setStatus(e.target.value)}/>
                    </div>
                </div>

                
                
            </form>
        </Modal>
        
    )}
    </div>
    
</div>
  )
}
