import React, { useEffect, useState } from 'react'
import '../Addcontact/Addcontact.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editcontact = () => {
    const notify = () => toast("Please fill required field");
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState({
        Name: "",
        JobTitle: "",
        MobileNumber: "",
        Emailid: "",
        org: "",
        website: "",
        fb: "",
        insta: "",
        linkedin: "",
        secnum: ""
    });
    const id = localStorage.getItem("edit contact");

    const condatafun = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        const result = async () => { axios.get(`http://localhost:8001/managecontact/${id}`).then(res => setuserdata(res.data)); }
        result();
        if (sessionStorage.getItem("sesemail")) {
            navigate('/Editcontact');
        }
        else {
            navigate('/Login')
        }

    }, []);
    const contactupdate = () => {
        if ((userdata.Name.length) > 0 && (userdata.JobTitle.length) > 0 && (userdata.MobileNumber.length) > 0 && (userdata.Emailid.length) > 0) {
            axios.put(`http://localhost:8001/managecontact/${id}`, userdata);
            navigate('/Managecontact');
        }
        else {

            notify()
        }

    }
const back = () =>
{
    localStorage.clear("edit contact")
    navigate('/Managecontact');
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
                        <><div className='info-input d-flex flex-column col-lg-4'>
                            <label>Name <span className='req'>*</span></label>
                            <input type="text" name='Name' value={userdata.Name} onChange={condatafun}></input>
                        </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Job Title <span className='req'>*</span></label>
                                <input type="text" name='JobTitle' value={userdata.JobTitle} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Mobile Number <span className='req'>*</span></label>
                                <input type="text" name='MobileNumber' value={userdata.MobileNumber} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Email id <span className='req'>*</span></label>
                                <input type="text" name='Emailid' value={userdata.Emailid} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Organization</label>
                                <input type="text" name='org' value={userdata.org} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Website</label>
                                <input type="text" name='website' value={userdata.website} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Facebook</label>
                                <input type="text" name='fb' value={userdata.fb} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Instagram</label>
                                <input type="text" name='insta' value={userdata.insta} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Linkedin</label>
                                <input type="text" name='linkedin' value={userdata.linkedin} onChange={condatafun}></input>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Secondary  Phone Number</label>
                                <input type="text" name='secnum' value={userdata.secnum} onChange={condatafun}></input>
                            </div>
                        </>

                    </div>
                    <div className='contactfrom-btn d-flex justify-content-center'>
                        <button className='btn add-update' onClick={contactupdate}>Update</button>
                        <button className='btn add-cancel' onClick={back}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editcontact