import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Managecontact.css';
import greeneye from '../../Assets/images/greeneye.png';
import pen from '../../Assets/images/pen.png';
import trash from '../../Assets/images/trash.png';
import axios from 'axios';


function Managemain() {
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState([]);
    const [filtername, setfiltername] = useState('');
    const [filterjob, setfilterjob] = useState('');
    const [filternum, setfilternum] = useState('');
    const [filteremail, setfilteremail] = useState('');


    useEffect(() => {
        const result = async () => { axios.get("http://localhost:8001/managecontact").then(res => setuserdata(res.data)); }
        result();
    }, []);
   const viewcontact = (val) =>
   {
      localStorage.setItem("view contact",val);
    navigate('/contactinformation');
   }
   const editcontact = (val) =>
   {
      localStorage.setItem("edit contact",val);
    navigate('/Editcontact');
   }
   const deletecontact = (val) =>
   {
      axios.delete(`http://localhost:8001/managecontact/${val}`).then(res => {console.log(res)});
      window.location.reload(false)
  
   }
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
                        <input type="text" className='filter-btn ' placeholder="Search by User Name..." value={filtername} onChange={(e)=>setfiltername(e.target.value)} />
                        <input type="text" className='filter-btn ' placeholder="Search by Job title"  value={filterjob} onChange={(e)=>setfilterjob(e.target.value)}/>
                        <input type="text" className='filter-btn ' placeholder="+1 651-319-4767" value={filternum} onChange={(e)=>setfilternum(e.target.value)} />
                        <input type="text" className='filter-btn' placeholder="Search by Email Id" value={filteremail} onChange={(e)=>setfilteremail(e.target.value)} />
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
                        {userdata.filter(val => 
                        val.Name.toLowerCase().includes(filtername.toLowerCase()) && val.JobTitle.toLowerCase().includes(filterjob.toLowerCase()) && val.MobileNumber.toLowerCase().includes(filternum.toLowerCase()) && val.Emailid.toLowerCase().includes(filteremail.toLowerCase())
                        ).map(filteredName => {
                            return(filteredName)
                        }).map((value) => {
                                return (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td><a className='con-name' onClick={() => viewcontact(value.id)}>{value.Name}</a></td>
                                        <td>{value.JobTitle}</td>
                                        <td>{value.MobileNumber}</td>
                                        <td>{value.Emailid}</td>
                                        <td>
                                            <div className='icon-div d-flex'>
                                                <div> <img src={greeneye} alt="logo here" onClick={() => viewcontact(value.id)}/></div>
                                                <div><img src={pen} alt="logo here" onClick={() => editcontact(value.id)} /></div>
                                                <div><img src={trash} alt="logo here" onClick={() => deletecontact(value.id)} /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Managemain