import React, { useEffect, useState } from 'react'
import './Addcontact.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addcontact = () => {
    const notify = () => toast("Please fill required field");
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState([]);

    const [contactdata, setcontactdata] = useState({
        Name:"",
        JobTitle:"",
        MobileNumber:"",
        Emailid:"",
        org:"",
        website:"",
        fb:"",
        insta:"",
        linkedin:"",
        secnum:""
    })
const condatafun = (e) =>
{
    setcontactdata({ ...contactdata, [e.target.name]: e.target.value });
}
    useEffect(() => {
        const result = async () => { axios.get("http://localhost:8001/managecontact").then(res => setuserdata([res.data])); }
        result();
        if(sessionStorage.getItem("sesemail"))
    {
      navigate('/Addcontact');
    }
    else{
      navigate('/Login')
    }

    }, []);
   
 
const contactupdate = () =>
{
 if(contactdata.Name > 0 && contactdata.JobTitle && contactdata.MobileNumber )
 {
    axios.post(`http://localhost:8001/managecontact`,contactdata);
    navigate('/Managecontact');
 }
 else{

    notify()
 }
    
}

    return (
        <>
        <div id='toast-1'>
        <ToastContainer />
        </div>
        
            <h3 className='contactdetail'>Contact Form</h3>
            <div className='add-contact'>
                <div className='d-flex justify-content-between add-contact-add'>
                    <p className='add-edit'>Add/Edit Form</p>
                    <button className='btn add-field' >Add Field</button>
                </div>
                <div className='apex'></div>
                <div className='basic-information'>
                    <p className='basic-info add-edit add-contact-add'>Basic Information</p>
                    <div className='info-input-main row'>
                        {/* {userdata.map((value) => {
                            return (
                                <>{value.label.map((e, key) => {
                                    return (
                                        <div key={key} className='info-input d-flex flex-column col-lg-4'>
                                            <label>{e}</label>
                                            <input type='text' placeholder={`Enter ${e}`} name={`label-${key}`} />
                                        </div>
                                    )
                                })}</>

                            )
                        })} */}
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Name*</label>
                            <input type="text" name='Name' value={contactdata.Name} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Job Title*</label>
                            <input type="text" name='JobTitle' value={contactdata.JobTitle} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Mobile Number*</label>
                            <input type="text" name='MobileNumber' value={contactdata.MobileNumber} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Email id</label>
                            <input type="text" name='Emailid' value={contactdata.Emailid} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Organization</label>
                            <input type="text" name='org' value={contactdata.org} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Website</label>
                            <input type="text" name='website' value={contactdata.website} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Facebook</label>
                            <input type="text" name='fb' value={contactdata.fb} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Instagram</label>
                            <input type="text" name='insta' value={contactdata.insta} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Linkedin</label>
                            <input type="text" name='linkedin' value={contactdata.linkedin} onChange={condatafun}></input>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Secondary  Phone Number</label>
                            <input type="text" name='secnum' value={contactdata.secnum} onChange={condatafun}></input>
                        </div>

                    </div>
                    <div className='contactfrom-btn d-flex justify-content-center'>
                        <button className='btn add-update' onClick={contactupdate}>Update</button>
                        <button className='btn add-cancel' >Cancel</button>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Addcontact