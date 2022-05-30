import React, { useState, useEffect  } from 'react';

import scan from '../../Assets/images/scan.png';
import logo from '../../Assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import './Login.css'
import { emailValidator, passwordValidator , passwordValidator1,passwordValidator2 } from '../../Shared/Passwordregexp'
import axios from 'axios';


function Login() {
    let navigate = useNavigate();
    const [data, setdata] = useState({email:'',password:''});
    const valuechange = (e) =>
    {
        setdata({ ...data, [e.target.name]: e.target.value });
    }
    
    const [eye, seteye] = useState(true)
    const [emailerrormsg, setemailerrormsg] = useState('')
    const [passworderrormsg, setpassworderrormsg] = useState('')
    const [userdata, setuserdata] = useState();
    const [flat, setflat] = useState(false)

  
    useEffect(() => {
        const result = async () =>{axios.get("http://localhost:8001/User").then(res => setuserdata(res.data));}
        result();
        if(sessionStorage.getItem("sesemail"))
        {
          navigate('/');
        }
        else{
          navigate('/Login')
        }
      }, []);
    const passwordshow = () => {
        seteye(!eye)
    }



    const loginsubmit = (event) => {
        event.preventDefault();
        const validatedmail = emailValidator(data.email);
        const validatedPassword = passwordValidator(data.password);
        const validatedPassword1 = passwordValidator1(data.password);
        const validatedPassword2 = passwordValidator2(data.password);
        if (!validatedmail) {
            setemailerrormsg('Please enter valid email')
        }
        else {
            setemailerrormsg('')
        }
        if (!validatedPassword) {
            setpassworderrormsg('Password must be in 8 character')
        }
       else  if(!validatedPassword1)
        {
            setpassworderrormsg('Make sure password must contain atleast one uppercase and one lowercase')
        }
        else  if(!validatedPassword2)
        {
            setpassworderrormsg('Make sure password must contain atleast one special character and number')
        }
        else {
            setpassworderrormsg('')
        
        if (validatedmail && validatedPassword) {
            console.log(userdata[0].email);
            console.log(data.email);
            
           for(var i=0 ;i<userdata.length ;i++)
           {
               if((userdata[i].email==data.email)&&(userdata[i].password==data.password))
               {
                   console.log('yes');
                   sessionStorage.setItem("sesemail",data.email);
                //    sessionStorage.removeItem("sesemail")
                   navigate("/")
                   setflat(true)
                  console.log(flat)
               }
               else{
                setpassworderrormsg('Invalid username or password')
               }
           }
           
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
                        <h3>Login</h3>
                        <form onSubmit={loginsubmit}>
                            <div className="form-group">
                                <label htmlFor="usr" className="email-para">Email Id</label>
                                <input type="text" className="form-control email-inp email-inp-one" id="usr" name="email" value={data.email} onChange={valuechange} />
                                {emailerrormsg && <p className='email-error-msg'>{emailerrormsg}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="usr" className="email-para">Password</label>
                                <div className='email-head' >
                                    <input type={eye ? 'password' : 'text'} className="form-control email-inp email-inp-two " id="password" name="password" value={data.password} onChange={valuechange} />
                                    <div className='email-password' onClick={passwordshow}></div>
                                    {passworderrormsg && <p className='password-error-msg'>{passworderrormsg}</p>}
                                </div>
                            </div>
                            <div className="forgot-div remeber-label">
                                <div className="form-check">
                                    <label className="check-box-main">Remember me
                                        <input type="checkbox"  />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div  onClick={()=>{navigate('/Forgotpassword')}} className='forgot-link'>Forgot Password?</div>
                            </div>

                            <div className="form-group">
                                <button className="btn login-btn">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Login;