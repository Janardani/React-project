import React, { useState, useEffect } from 'react'
import scan from '../../Assets/images/scan.png';
import logo from '../../Assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';

function Forgotpassword() {

    let navigate = useNavigate();
    const [email, setemail] = useState('');
    const [userdata, setuserdata] = useState('');
    const [emailerrormsg, setemailerrormsg] = useState('');

    const valuechange = (e) => {
        setemail(e.target.value);
    }

    useEffect(() => {
        const result = async () => { axios.get("http://localhost:8001/User").then(res => setuserdata(res.data)); }
        result();
    }, []);

    /* validation here*/
    const loginsubmit = (event) => {
        event.preventDefault();
        for (var i = 0; i < (userdata.length); i++) {

            if ((email) == (userdata[i].email)) {
                localStorage.setItem('id for validation', i)
                navigate('/Resetpassword')
            }
            else {
                setemailerrormsg('Please enter correct password');
            }
        }
    }


    return (
        <div>
            <div className="login">
                <div className="log log-one">
                    <div className="log-con">
                        <div className="corner-div corner-one"></div>
                        <div className="corner-div corner-two"></div>
                        <h1 className="orange">Welcome to Our</h1>
                        <h1> NFC Business Card</h1>
                        <p>Login to your Existing Account of NFC Business Card </p>
                        <img src={scan} alt="something here" />
                        <div className="corner-div corner-three"></div>
                        <div className="corner-div corner-four"></div>
                    </div>
                </div>
                <div className="log log-two">
                    <div className='business-card-header'>
                        <img src={logo} alt="logo here" />
                        <h3 className="business-card">NFC BUSINESS <span className="black-clr">CARD</span> </h3>
                    </div>
                    <div className="login-card">
                        <h3>Forgot Password</h3>
                        <form onSubmit={loginsubmit}>
                            <div className="form-group">
                                <label htmlFor="usr" className="email-para">Email Id</label>
                                <input type="text" autoComplete='off' className="form-control email-inp email-inp-one" id="usr-1" name="email" value={email} onChange={valuechange} />
                                {emailerrormsg && <p className='email-error-msg'>{emailerrormsg}</p>}
                            </div>
                            <div className="form-group forgotpassword-submit">
                                <button className="btn login-btn">SUBMIT</button>
                            </div>
                            <div className='forgot-link forgotpassword-class' onClick={() => navigate("/Login")}>Back to login</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword