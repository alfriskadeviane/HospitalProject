import React from 'react'
import './KaryawanCuti.css'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import btnclose from '../Assets/close.png'
import {db} from '../../Config/Firebaseconfig'
import { doc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

export const KaryawanCuti = () => {
    const [selectedUser, setSelectedUser] = useState(null); // For storing selected user data for update
    const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal
    const [isEditing, setIsEditing] = useState(false); // To distinguish between adding and updating
    const [Name, setName] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [LeaveName, setLeaveName] = useState('');
    const [Room, setRoom] = useState('');
    const [Status, setStatus] = useState('');
    const [SPV, setSPV] = useState('');
    const [Address, setAddress] = useState('');
    const [LeaveAmt, setLeaveAmt] = useState('');
    const [Reason, setReason] = useState('');
    const [ReasonRejected, setReasonRejected] = useState('');
    const [id, setId] = useState('');
    const [fetchData, setFetchData] =useState([]);

     // Function to handle modal close
     const closeModal = () => {
        setName('')
        setStartDate('')
        setEndDate('')
        setLeaveName('')
        setRoom('')
        setSPV('')
        setStatus('')
        setAddress('')
        setLeaveAmt('')
        setReason('')
        setReasonRejected('')
        setIsModalOpen(false);
    };

    // creating db ref
    const dbref = collection(db, "leaveshistory")

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
        const translatedStatus = translateStatus(matchId.approval);
        console.log(matchId)
        setName(matchId.Name)
        setStartDate(matchId.date)
        setEndDate(matchId.dateEnd)
        setLeaveName(matchId.onLeave)
        setRoom(matchId.Room)
        setStatus(translatedStatus)
        setSPV(matchId.spv.Name)
        setAddress(matchId.address)
        setLeaveAmt(matchId.dayLeave)
        setReason(matchId.reason)
        setReasonRejected(matchId.reasonReject)
        setId(matchId.id)
    }

    const translateStatus = (status) => {
        if (status === 'approved') {
          return 'diterima';
        } else if (status === 'rejected') {
          return 'ditolak';
        } else if (status === 'waiting') {
          return 'menunggu';
        } else {
          return 'Status tidak diketahui'; // Default case if status is not found
        }
      };

  return (
    <div className='container'>
    <h1>DATA KARYAWAN CUTI</h1>
    <div><p>   </p></div>
    <table className="table table-striped-columns md-3">
        <thead>
            <tr>
            <th scope="col" className='text-center'>Nama</th>
            <th scope="col" className='text-center'>Ruangan</th>
            <th scope="col" className='text-center'>Jenis Cuti</th>
            <th scope="col" className='text-center'>Tanggal Mulai</th>
            <th scope="col" className='text-center'>Tanggal Selesai</th>
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
                            <td>{data.Name}</td>
                            <td>{data.Room}</td>
                            <td>{data.onLeave}</td>
                            <td>{data.date}</td>
                            <td>{data.dateEnd}</td>
                            <td>{translateStatus(data.approval)}</td>
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
                    <label for="inputNIP" class="col-sm-2 col-form-label">Nama</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputNIP" disabled={true}    value={Name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputNIP" class="col-sm-2 col-form-label">Alamat</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputNIP" disabled={true}    value={Address} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputName" class="col-sm-2 col-form-label">Tanggal Mulai</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputName" disabled={true} value={StartDate} onChange={(e) => setStartDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Tanggal Selesai</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={EndDate} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputName" class="col-sm-2 col-form-label">Jumlah Cuti</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputName" disabled={true} value={LeaveAmt} onChange={(e) => setStartDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Jenis Cuti</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={LeaveName} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Alasan</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Reason} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Ruangan</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Room} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Atasan</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={SPV} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label for="inputRole" class="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-10">
                    <input type="text" class="form-control" id="inputRole" disabled={true} value={Status} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>

                
                {(Status === 'ditolak' || Status === 'rejected') ? (
                    <div className="mb-3 row">
                        <label for="inputRole" class="col-sm-2 col-form-label">Alasan ditolak</label>
                        <div className="col-sm-10">
                        <input type="text" class="form-control" id="inputRole" disabled={true} value={ReasonRejected} onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                    </div>
                ) : null}

                
                
            </form>
        </Modal>
        
    )}
    </div>
    
</div>
  )
}
