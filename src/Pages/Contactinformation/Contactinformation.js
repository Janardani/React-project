import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Contactinformation.css'
import { useNavigate } from 'react-router-dom';
import in1 from '../../Assets/images/1in.png'
import in2 from '../../Assets/images/2in.png'
import in3 from '../../Assets/images/3in.png'
import in4 from '../../Assets/images/4in.png'
import in5 from '../../Assets/images/5in.png'
import in6 from '../../Assets/images/6in.png'
import in7 from '../../Assets/images/7in.png'
import in8 from '../../Assets/images/8in.png'
import in9 from '../../Assets/images/9in.png'
import in10 from '../../Assets/images/10in.png'
import in11 from '../../Assets/images/11in.png'
import backbtn from '../../Assets/images/backbtn.png'


const Contactinformation = () => {
    const [userdata, setuserdata] = useState([]);
    const navigate = useNavigate();
    const id = localStorage.getItem("view contact");
    useEffect(() => {
        const result = async () => { axios.get(`http://localhost:8001/managecontact/${id}`).then(res => setuserdata(res.data)); }
        result();
    }, []);
    const backfuction = () =>
    {
        localStorage.clear("view contact");
        navigate('/Managecontact')
    }
  
  return (
        <div>
           <div className='contact-main d-flex justify-content-between align-items-baseline'>
            <h3 className='contactdetail'>Contact information</h3>
            <button className='btn back-btn'  onClick={backfuction}>Back
            <div className='backbtnlogo'>
                <img src={backbtn} alt="image here" />
            </div>
            </button>
            </div>
            <div className='row'>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in1} alt="image here" />
                        <p className='inf-para'>Name</p>
                        <p className='inf-strng'>{userdata.Name}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in2} alt="image here" />
                        <p className='inf-para'>Job Title</p>
                        <p className='inf-strng'>{userdata.JobTitle}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in3} alt="image here" />
                        <p className='inf-para'>Mobile Number</p>
                        <p className='inf-strng'>{userdata.MobileNumber}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in4} alt="image here" />
                        <p className='inf-para'>Email id</p>
                        <p className='inf-strng'>{userdata.Emailid}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in5} alt="image here" />
                        <p className='inf-para'>Organization</p>
                        <p className='inf-strng'>{userdata.org}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in6} alt="image here" />
                        <p className='inf-para'>Website</p>
                        <p className='inf-strng inf-web'>{userdata.website}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in7} alt="image here" />
                        <p className='inf-para'>Facebook</p>
                        <p className='inf-strng inf-fb'>{userdata.fb}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in8} alt="image here" />
                        <p className='inf-para'>Intagram</p>
                        <p className='inf-strng inf-insta'>{userdata.insta}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in9} alt="image here" />
                        <p className='inf-para'>Linkedin</p>
                        <p className='inf-strng inf-linkedin'>{userdata.linkedin}</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in10} alt="image here" />
                        <p className='inf-para'>Custom Fields</p>
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='inf-img'>
                        <img src={in11} alt="image here" />
                        <p className='inf-para'>Address</p>
                    </div>
                </div>
            </div>
        </div>
    )
   
}

export default Contactinformation