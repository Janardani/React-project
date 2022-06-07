import React, { useEffect, useState } from 'react'
import "./Managecontact.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { emailValidator, NumberValidator } from '../../Shared/Passwordregexp';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../../Common/Dashboard';
import { AiOutlineUser } from 'react-icons/ai';
import { BsTelephoneFill,BsGlobe } from 'react-icons/bs';
import { GiOrganigram } from 'react-icons/gi';
import {IoBagSharp} from 'react-icons/io5';
import {GoMail} from 'react-icons/go';
import {FaFacebookF,FaInstagram,FaLinkedinIn} from 'react-icons/fa';
import { IconContext } from 'react-icons';

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
    const [emailerror, setemailerror] = useState('');
    const [numeonerror, setnumoneerror] = useState('');
    const [numtwoerror, setnumtwoerror] = useState('');
    var newflag = true;
    const id = localStorage.getItem("edit contact");

    const condatafun = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        localStorage.setItem("dashboard page", 2);
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
        setemailerror("")
        setnumoneerror("")
        setnumtwoerror("")
        const validatedmail = emailValidator(userdata.Emailid);
        const validatednumber = NumberValidator(userdata.MobileNumber);
        const Validatesecnumber = NumberValidator(userdata.secnum);

        if ((userdata.Name.length) == 0 && (userdata.MobileNumber.length) == 0) {
            notify()
        }
        else {

            if ((!validatedmail) && (userdata.Emailid.length) > 0) {
                setemailerror('Please enter valid email');
                newflag = false;
            }
            if ((!validatednumber) && (userdata.MobileNumber.length) > 0) {
                setnumoneerror('Please enter valid mobile number');
                newflag = false;
            }
            if ((!Validatesecnumber) && (userdata.secnum.length) > 0) {
                setnumtwoerror('Please enter valid mobile number');
                newflag = false;
            }

            if (newflag) {
                axios.put(`http://localhost:8001/managecontact/${id}`, userdata);
                navigate('/Managecontact');
            }


        }

    }
    const back = () => {
        localStorage.clear("edit contact")
        navigate('/Managecontact');
    }
     // upload images

     const [upload, setupload] = useState("https://png.pngitem.com/pimgs/s/508-5087336_person-man-user-account-profile-employee-profile-template.png");
     const uploadimageclick = (e) => {
         const reader = new FileReader();
         reader.onload = () => {
             if (reader.readyState === 2) {
                 setupload(reader.result);
             }
         }
         reader.readAsDataURL(e.target.files[0])
     }
 
     const removephoto = () => {
         setupload("https://png.pngitem.com/pimgs/s/508-5087336_person-man-user-account-profile-employee-profile-template.png")
     }
     var title = "Manage Contact"
    return (
        <>
            <Dashboard title={title}>
                
                <div id='toast-1'>
                    <ToastContainer />
                </div>
                <h3 className='contactdetail'>Contact Form</h3>
                <div className='add-contact'>
                    <div className='d-flex justify-content-between add-contact-add'>
                        <p className='add-edit'>Add/Edit Form</p>
                        <button className='btn add-field' >Add Field</button>
                    </div>
                    <div className='apex d-flex align-items-center'>
                        <div className='upload-img'>
                            <img src={upload} alt="image here"></img> </div>
                        <div className='change-logo-wrapper'>
                            <input type="file" id='input-1' accept='images/*' className="form-control change-" onChange={uploadimageclick} />
                            <label htmlFor='input-1'><span className='btn change-logo-btn'>change logo</span></label>
                        </div>
                        <span className='remove-photo' onClick={removephoto}>Remove Photo</span>
                    </div>
                    <IconContext.Provider value={{ color: ' #898d99', size: '20px' }}>
                    <div className='basic-information'>
                        <p className='basic-info add-edit add-contact-add'>Basic Information</p>
                        <div className='info-input-main row'>
                            <><div className='info-input d-flex flex-column col-lg-4'>
                                <label>Name <span className='req'>*</span></label>
                                <div className='custom-input'>
                                    <input autoComplete='off' type="text" name='Name' value={userdata.Name} onChange={condatafun} placeholder="Enter name" required></input>
                                    <span className='add-img'>
                                    <AiOutlineUser />
                                    </span>
                                </div>
                            </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Job Title </label>
                                    <div className='custom-input'>
                                        <input autoComplete='off' type="text" name='JobTitle' value={userdata.JobTitle} onChange={condatafun} placeholder="Enter Job Title"></input>
                                        <span className='add-img'>
                                        <IoBagSharp />
                                        </span>
                                    </div>
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Mobile Number <span className='req'>*</span></label>
                                    <div className='custom-input'>
                                        <input autoComplete='off' type="text" name='MobileNumber' value={userdata.MobileNumber} onChange={condatafun} placeholder="Enter Phone Number"></input>
                                        <span className='add-img'>
                                        <BsTelephoneFill />
                                        </span>
                                    </div>
                                    {numeonerror && <p className='email-error-msg'>{numeonerror}</p>}
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Email id</label>
                                    <div className='custom-input'>
                                        <input autoComplete='off' type="text" name='Emailid' value={userdata.Emailid} onChange={condatafun} placeholder="Enter Email id" />
                                        <span className='add-img'>
                                        <GoMail />
                                        </span>

                                    </div>
                                    {emailerror && <p className='email-error-msg'>{emailerror}</p>}
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Organization</label>
                                    <div className='custom-input'>  <input type="text" autoComplete='off' name='org' value={userdata.org} onChange={condatafun} placeholder="Enter Organization"></input>
                                        <span className='add-img'>
                                        <GiOrganigram />
                                        </span>
                                    </div>
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Website</label>
                                    <div className='custom-input'>
                                        <input autoComplete='off' type="text" name='website' value={userdata.website} onChange={condatafun} placeholder="Enter Website"></input>
                                        <span className='add-img'>
                                        <BsGlobe />
                                        </span>

                                    </div>
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Facebook</label>
                                    <div className='custom-input'>
                                        <input type="text" autoComplete='off' name='fb' value={userdata.fb} onChange={condatafun} placeholder="Enter facebook link"></input>
                                        <span className='add-img'>
                                        <FaFacebookF />
                                        </span>

                                    </div>
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Instagram</label>
                                    <div className='custom-input'>
                                        <input type="text" autoComplete='off' name='insta' value={userdata.insta} onChange={condatafun} placeholder="Enter Instagram link"></input>
                                        <span className='add-img'>
                                        <FaInstagram />
                                        </span>

                                    </div>
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Linkedin</label>
                                    <div className='custom-input'>
                                        <input type="text" name='linkedin' autoComplete='off' value={userdata.linkedin} onChange={condatafun} placeholder="Enter Linkedin link"></input>
                                        <span className='add-img'>
                                        <FaLinkedinIn />
                                        </span>
                                    </div>
                                </div>
                                <div className='info-input d-flex flex-column col-lg-4'>
                                    <label>Secondary  Phone Number</label>
                                    <div className='custom-input'>
                                        <input type="text" name='secnum' autoComplete='off' value={userdata.secnum} onChange={condatafun} placeholder="Enter Phone Number"></input>
                                        <span className='add-img'>
                                        <BsTelephoneFill />
                                        </span>

                                    </div>

                                    {numtwoerror && <p className='email-error-msg'>{numtwoerror}</p>}
                                </div>
                            </>
                        </div>
                        <div className='contactfrom-btn d-flex justify-content-center'>
                            <button className='btn add-update' onClick={contactupdate}>Update</button>
                            <button className='btn add-cancel' onClick={back}>Cancel</button>
                        </div>
                    </div>
                    </IconContext.Provider>
                </div>
            </Dashboard>
        </>
    )
}

export default Editcontact