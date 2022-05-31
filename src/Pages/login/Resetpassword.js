import React,{useState,useEffect} from 'react'
import scan from '../../Assets/images/scan.png';
import logo from '../../Assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import { passwordValidator , passwordValidator1,passwordValidator2 } from '../../Shared/Passwordregexp'

import './Login.css'
import axios from 'axios';


function Resetpassword() {
    let navigate = useNavigate();
    const [reset, setreset] = useState({password:'',confirmpassword:''});
    const [userdata, setuserdata] = useState('');
    const [errormsg,seterrormsg] = useState('');
    const [eyeone, seteyeone] = useState(true);
    const [eyetwo, seteyetwo] = useState(true)
    const valuechange = (e) =>
    {
        setreset({...reset,[e.target.name]:e.target.value});
    }
    const passwordshowone = () => {
        seteyeone(!eyeone)
    }
    const passwordshowtwo = () => {
        seteyetwo(!eyetwo)
    }
    useEffect(() => {
       const  result = async () =>{axios.get("http://localhost:8001/User").then(res => setuserdata(res.data));
      
    }
        result();
      }, []);
      let value = parseInt(localStorage.getItem("id for validation"));
      
console.log(value+1);
    const loginsubmit = (event) => {
        event.preventDefault();
        const validatedPassword = passwordValidator(reset.password);
        const validatedPassword1 = passwordValidator1(reset.password);
        const validatedPassword2 = passwordValidator2(reset.password);
        if(!((reset.password)==(reset.confirmpassword)))
        {
            seterrormsg("Confirm password doesn't match");   
        }
       else  if (!validatedPassword) {
            seterrormsg('Password must be in 8 character')
        }
       else  if(!validatedPassword1)
        {
            seterrormsg('Make sure password must contain atleast one uppercase and one lowercase')
        }
        else  if(!validatedPassword2)
        {
            seterrormsg('Make sure password must contain atleast one special character and number')
        }
        else
        {
            seterrormsg('')
           const data = {
            "email":userdata[value].email,
            "password": reset.password
        }
           axios.put(`http://localhost:8001/User/${value+1}`,data);
           localStorage.clear("id for validation");
            navigate('/Login')
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
                        <label htmlFor="usr" className="email-para">Password</label>
                        <div className='email-head' >
                        <input type={eyeone ? 'password' : 'text'} className="form-control email-inp email-inp-one" id="usr" name="password" value={reset.password} onChange={valuechange} />
                        <div className='email-password' onClick={passwordshowone}></div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr" className="email-para">Confirm Password </label>
                        <div className='email-head' >
                        <input type={eyetwo ? 'password' : 'text'} className="form-control email-inp email-inp-one" id="usr" name="confirmpassword" value={reset.confirmpassword} onChange={valuechange} />
                        <div className='email-password' onClick={passwordshowtwo}></div>
                        </div>
                    </div>

                    {errormsg && <p className='email-error-msg'>{errormsg}</p>}

                    <div className="form-group forgotpassword-submit">
                        <button className="btn login-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default Resetpassword