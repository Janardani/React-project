import React, { useEffect, useState } from 'react'
import "./Managecontact.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emailValidator, NumberValidator } from '../../Shared/Passwordregexp'
import Dashboard from '../../Common/Dashboard';
import { AiOutlineUser } from 'react-icons/ai';
import { BsTelephoneFill, BsGlobe } from 'react-icons/bs';
import { GiOrganigram } from 'react-icons/gi';
import { IoBagSharp } from 'react-icons/io5';
import { GoMail } from 'react-icons/go';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { IconContext } from 'react-icons';
import close from '../../Assets/images/close.png';

const Addcontact = () => {
    const notify = () => toast("Please fill required field");
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState([]);
    const [emailerror, setemailerror] = useState('');
    const [numeonerror, setnumoneerror] = useState('');
    const [numtwoerror, setnumtwoerror] = useState('');
    var newflag = true;

    /* ----------------add contact field -----------*/
    const [newlabel, setnewlabel] = useState([{ label: "", value: "" }]);
    const [flag, setflag] = useState(false);
    const [valueset, setvalueset] = useState([]);
    const [labelValues, setlabelValues] = useState("");
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
        secnum: "",
        newlabel: []
    })
    /* --------get value for static input---------------*/
    const condatafun = (e) => {
        setcontactdata({ ...contactdata, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        localStorage.setItem("dashboard page", 2);
        const result = async () => { axios.get("http://localhost:8001/managecontact").then(res => setuserdata([res.data])); }
        result();
        if (sessionStorage.getItem("sesemail")) {
            navigate('/Addcontact');
        }
        else {
            navigate('/Login')
        }

    }, []);

    /*------------------Authentication ---------------*/
    const contactupdate = () => {
        setemailerror("")
        setnumoneerror("")
        setnumtwoerror("")
        const validatedmail = emailValidator(contactdata.Emailid);
        const validatednumber = NumberValidator(contactdata.MobileNumber);
        const Validatesecnumber = NumberValidator(contactdata.secnum);

        if ((contactdata.Name.length) == 0 && (contactdata.MobileNumber.length) == 0) {
            notify()
        }
        else {

            if ((!validatedmail) && (contactdata.Emailid.length) > 0) {
                setemailerror('Please enter valid email');
                newflag = false;
            }
            if ((!validatednumber) && (contactdata.MobileNumber.length) > 0) {
                setnumoneerror('Please enter valid mobile number');
                newflag = false;
            }
            if ((!Validatesecnumber) && (contactdata.secnum.length) > 0) {
                setnumtwoerror('Please enter valid mobile number');
                newflag = false;
            }

            if (newflag) {
                newlabel.forEach(data => {
                    if (data.label != '' || data.value != "") {
                        contactdata.newlabel.push(data);
                    }

                })
                console.log("contact data",contactdata);
                axios.post(`http://localhost:8001/managecontact`, contactdata);
                navigate('/Managecontact');
            }
        }
    }

    /* --------------------------- upload images ---------------------*/

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

    /* ----------------  dynamic add contact field  ---------------*/
    /* ----------------  Get label input  ---------------*/
    const handlelabel = (e) => {
        setlabelValues(e.target.value)
    }
    /* ---------------- save label value   ---------------*/
    const savelabel = () => {
        setvalueset([...valueset, labelValues]);
        setnewlabel([...newlabel, { label: "", value: "" }])
        setflag(true)
    }
    /* ---------------- Get dynamic input value  ---------------*/
    const labelchange = (event, k) => {
        let element = [...newlabel];
        element[k].label = valueset[k];
        element[k].value = event.target.value;
        setnewlabel(element);
    }
    /* -------------------- delete label ------------------   */

    const deletelabel = (value) => {
        valueset.splice(value, 1);
        newlabel.splice(value, 1);
        setflag(true)
    }

    /*  ------------------  use effect ------------------- */
    useEffect(() => {
        if (flag) { setflag(false) }
    }, [savelabel])


    return (
        <Dashboard title={title}>
            <div id='toast-1'>
                <ToastContainer />
            </div>

            <h3 className='contactdetail'>Contact Form</h3>
            <div className='add-contact'>
                <div className='d-flex justify-content-between add-contact-add'>
                    <p className='add-edit'>Add/Edit Form</p>
                    <button className='btn add-field' data-bs-toggle="modal" data-bs-target="#myModal">Add Field</button>
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
                <div className='basic-information'>
                    <p className='basic-info add-edit add-contact-add'>Basic Information</p>

                    <IconContext.Provider value={{ color: ' #898d99', size: '20px' }}>
                        <div className='info-input-main row'>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label htmlFor='name'>Name <span className='req'>*</span></label>
                                <div className='custom-input'>
                                    <input id='name' autoComplete='off' type="text" name='Name' value={contactdata.Name} onChange={condatafun} placeholder="Enter name" required></input>
                                    <span className='add-img'>
                                        <AiOutlineUser />
                                    </span>
                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Job Title </label>
                                <div className='custom-input'>
                                    <input type="text" autoComplete='off' name='JobTitle' value={contactdata.JobTitle} onChange={condatafun} placeholder="Enter Job Title"></input>
                                    <span className='add-img'>
                                        <IoBagSharp />
                                    </span>
                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Mobile Number <span className='req'>*</span></label>
                                <div className='custom-input'>
                                    <input type="text" autoComplete='off' name='MobileNumber' value={contactdata.MobileNumber} onChange={condatafun} placeholder="Enter Phone Number"></input>
                                    <span className='add-img'>
                                        <BsTelephoneFill />
                                    </span>

                                </div>

                                {numeonerror && <p className='email-error-msg'>{numeonerror}</p>}
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Email id</label>
                                <div className='custom-input'>
                                    <input type="text" autoComplete='off' name='Emailid' value={contactdata.Emailid} onChange={condatafun} placeholder="Enter Email id" />
                                    <span className='add-img'>
                                        <GoMail />
                                    </span>

                                </div>
                                {emailerror && <p className='email-error-msg'>{emailerror}</p>}
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Organization</label>
                                <div className='custom-input'>  <input type="text" name='org' autoComplete='off' value={contactdata.org} onChange={condatafun} placeholder="Enter Organization"></input>
                                    <span className='add-img'>
                                        <GiOrganigram />
                                    </span>
                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Website</label>
                                <div className='custom-input'>
                                    <input type="text" name='website' autoComplete='off' value={contactdata.website} onChange={condatafun} placeholder="Enter Website"></input>
                                    <span className='add-img'>
                                        <BsGlobe />
                                    </span>
                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Facebook</label>
                                <div className='custom-input'>
                                    <input type="text" name='fb' autoComplete='off' value={contactdata.fb} onChange={condatafun} placeholder="Enter facebook link"></input>
                                    <span className='add-img'>
                                        <FaFacebookF />
                                    </span>
                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Instagram</label>
                                <div className='custom-input'>
                                    <input type="text" name='insta' autoComplete='off' value={contactdata.insta} onChange={condatafun} placeholder="Enter Instagram link"></input>
                                    <span className='add-img'>
                                        <FaInstagram />
                                    </span>

                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Linkedin</label>
                                <div className='custom-input'>
                                    <input type="text" name='linkedin' autoComplete='off' value={contactdata.linkedin} onChange={condatafun} placeholder="Enter Linkedin link"></input>
                                    <span className='add-img'>
                                        <FaLinkedinIn />
                                    </span>

                                </div>
                            </div>
                            <div className='info-input d-flex flex-column col-lg-4'>
                                <label>Secondary  Phone Number</label>
                                <div className='custom-input'>
                                    <input type="text" name='secnum' autoComplete='off' value={contactdata.secnum} onChange={condatafun} placeholder="Enter Phone Number"></input>
                                    <span className='add-img'>
                                        <BsTelephoneFill />
                                    </span>

                                </div>

                                {numtwoerror && <p className='email-error-msg'>{numtwoerror}</p>}
                            </div>
                            {valueset ? (
                                valueset.map((ele, k) => {
                                    return (
                                        <div className='info-input d-flex flex-column col-lg-4' key={k}>
                                            <label>{ele}</label>
                                            <div className='custom-input flex-row'>
                                                <input autoComplete='off' type="text" name={ele} value={newlabel[k].value} placeholder={`Enter ${ele}`} onChange={(event) => labelchange(event, k)} />
                                                <span className='delete-label' onClick={() => deletelabel(k)}><img src={close} />     
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : <>
                                null
                            </>}
                        </div>
                    </IconContext.Provider>
                    <div className='contactfrom-btn d-flex justify-content-center'>
                        <button className='btn add-update' onClick={contactupdate}>Update</button>
                        <button className='btn add-cancel' onClick={() => navigate("/Managecontact")}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Add Field</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            <label className="form-label modal-label">Label Name</label>
                            <input type='text' placeholder='Enter label name' onChange={handlelabel} className="form-control modal-input"></input>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer justify-content-between">
                            <button type="button" onClick={savelabel} data-bs-dismiss="modal" className='btn modal-save'>Save</button>
                            <button type="button" className="btn  modal-cancel" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    )
}

export default Addcontact