import React, { useEffect, useState } from 'react'
import './Addcontact.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emailValidator,NumberValidator} from '../../Shared/Passwordregexp'
import add1 from '../../Assets/images/add1.png'
import add2 from '../../Assets/images/add2.png'
import add3 from '../../Assets/images/add3.png'
import add4 from '../../Assets/images/add4.png'
import add5 from '../../Assets/images/add5.png'
import add6 from '../../Assets/images/add6.png'
import add7 from '../../Assets/images/add7.png'
import add8 from '../../Assets/images/add8.png'
import add9 from '../../Assets/images/add9.png'
import apex from '../../Assets/images/apex.png'

const Addcontact = () => {
    const notify = () => toast("Please fill required field");
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState([]);
    const [emailerror, setemailerror] = useState('');
    const [numeonerror, setnumoneerror] = useState('');
    const [numtwoerror, setnumtwoerror] = useState('')

    const [contactdata, setcontactdata] = useState({
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
    })
    const condatafun = (e) => {
        setcontactdata({ ...contactdata, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        const result = async () => { axios.get("http://localhost:8001/managecontact").then(res => setuserdata([res.data])); }
        result();
        if (sessionStorage.getItem("sesemail")) {
            navigate('/Addcontact');
        }
        else {
            navigate('/Login')
        }

    }, []);
    const contactupdate = () => {
        const validatedmail = emailValidator(contactdata.Emailid);
        const validatednumber = NumberValidator(contactdata.MobileNumber);
        const Validatesecnumber  = NumberValidator(contactdata.secnum);
        if ( (contactdata.Name.length) == 0 && (contactdata.JobTitle.length) == 0 && (contactdata.MobileNumber.length) == 0  && (contactdata.Emailid.length) == 0) {
            notify()
        }
        else if (!validatedmail){
            setemailerror('Please enter validate email'); 
        }
        else if(!validatednumber)
        {
            setnumoneerror('Please enter valide mobile number');
            setemailerror('')
        }
        else if(!Validatesecnumber)
        {
            setnumtwoerror('Please enter valide mobile number');
            setnumoneerror('')
        }
        else {
            axios.post(`http://localhost:8001/managecontact`, contactdata);
            setnumtwoerror('')
            navigate('/Managecontact');
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
                <div className='apex'>
                    <div className='upload-img'>
                        <div>
                        <img src={apex}></img>
                        </div>
                      
                    </div>
                </div>
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
                            <label>Name <span className='req'>*</span></label>
                            <input type="text" name='Name' value={contactdata.Name} onChange={condatafun} placeholder="Enter name"></input>
                            <div className='add-img'>
                                <img  src={add1} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Job Title <span className='req'>*</span></label>
                            <input type="text" name='JobTitle' value={contactdata.JobTitle} onChange={condatafun} placeholder="Enter Job Title"></input>
                            <div className='add-img'>
                                <img  src={add2} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Mobile Number <span className='req'>*</span></label>
                            <input type="text" name='MobileNumber' value={contactdata.MobileNumber} onChange={condatafun} placeholder="Enter Phone Number"></input>
                            <div className='add-img'>
                                <img  src={add3} alt="image here"/>
                            </div>
                            {numeonerror && <p className='email-error-msg'>{numeonerror}</p>}
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Email id <span className='req'>*</span></label>
                            <input type="text" name='Emailid' value={contactdata.Emailid} onChange={condatafun} placeholder="Enter Email id"></input>
                            <div className='add-img'>
                                <img  src={add4} alt="image here"/>
                            </div>
                            {emailerror && <p className='email-error-msg'>{emailerror}</p>}
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Organization</label>
                            <input type="text" name='org' value={contactdata.org} onChange={condatafun} placeholder="Enter Organization"></input>
                            <div className='add-img'>
                                <img  src={add5} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Website</label>
                            <input type="text" name='website' value={contactdata.website} onChange={condatafun} placeholder="Enter Website"></input>
                            <div className='add-img'>
                                <img  src={add6} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Facebook</label>
                            <input type="text" name='fb' value={contactdata.fb} onChange={condatafun} placeholder="Enter facebook link"></input>
                            <div className='add-img'>
                                <img  src={add7} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Instagram</label>
                            <input type="text" name='insta' value={contactdata.insta} onChange={condatafun} placeholder="Enter Instagram link"></input>
                            <div className='add-img'>
                                <img  src={add8} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Linkedin</label>
                            <input type="text" name='linkedin' value={contactdata.linkedin} onChange={condatafun} placeholder="Enter Linkedin link"></input>
                            <div className='add-img'>
                                <img  src={add9} alt="image here"/>
                            </div>
                        </div>
                        <div className='info-input d-flex flex-column col-lg-4'>
                            <label>Secondary  Phone Number</label>
                            <input type="text" name='secnum' value={contactdata.secnum} onChange={condatafun} placeholder="Enter Phone Number"></input>
                            <div className='add-img'>
                                <img  src={add3} alt="image here"/>
                            </div>
                            {numtwoerror && <p className='email-error-msg'>{numtwoerror}</p>}
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