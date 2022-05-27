import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Managecontact.css'
import axios from 'axios';

function Managemain() {
    const  navigate = useNavigate();
    const [userdata, setuserdata] = useState([]);
    useEffect(() => {
        const result = async () =>{axios.get("http://localhost:8001/managecontact").then(res => setuserdata(res.data));}
        result();
      }, []);
    console.log("data",userdata)
    
    return (
        <div>
            <h3 className='contactdetail'>Contact Detail</h3>
            <div className='manage-main-div'>
                <div className='row'>
                    <div className='col-lg-5'>
                        <p className='list-contact'>List of Contacts</p>
                    </div>
                    <div className='col-lg-7 d-flex justify-content-end'>
                        <button className='btn sample-doc sample-btn'>Sample Document Download</button>
                        <button className='btn bulk-up sample-btn'>Bulk Upload Contact</button>
                        <button onClick={() => { navigate("/Addcontact") }} className='btn add-con sample-btn'>Add Contact</button>
                    </div>
                    <div className='filter-div'>
                        <p className='filter-para'>Filter</p>
                        <input  type="text" className='filter-btn ' placeholder ="Search by User Name..."/>
                        <input  type="text"  className='filter-btn ' placeholder ="Search by Job title"/>
                        <input  type="text"  className='filter-btn ' placeholder ="+1 651-319-4767" />
                        <input  type="text" className='filter-btn'  placeholder ="Search by Email Id"/>
                    </div>
                    <table className='table manage-contact-table'>
                    <thead>
                        <tr className='managecontact-tr'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Job title</th>
                            <th>Mobile Number</th>
                            <th>Email Id</th>
                            <th>Action</th>
                           
                        </tr>
                        </thead>
                        <tbody>
                        {userdata.map((value)=>
                        {
                            return(
                                <tr key={value.id}>
                                    <td>{value.id}</td>
                                    <td><a>{value.Name}</a></td>
                                    <td>{value.JobTitle}</td>
                                    <td>{value.MobileNumber}</td>
                                    <td>{value.Emailid}</td>
                                    <td>

                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Managemain