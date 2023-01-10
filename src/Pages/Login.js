import React,{ useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {postuser,getuser} from "../Redux/Features/postslice"
import "./style.css"

const Login = () => {
 let navigate = useNavigate();
 const dispatch = useDispatch();
  const [user, setuser] = useState({name:"",email:""})
  
  const handlechange = (e) =>{
setuser({...user,[e.target.name]:e.target.value})
  }
const handletake = () =>{
  if((user.name)!="" && (user.email)!="")
  {
    let name = user.name;
    let email = user.email
   dispatch(postuser({name:name,email:email}))
navigate("/html");
  }
  else{
    alert("Please enter your name and email")
  }
}
  return (
    <div className='login-main'>
    <div className='login'>
        <label className='form-label login-label'>Name</label>
        <input className='form-control login-input' type="text" value={user.name} name="name" onChange={handlechange}/>
        <label className='form-label login-label'>Email</label>
        <input  className='form-control login-input' type="text" value={user.email} name="email" onChange={handlechange}/>
        <button className='btn login-btn' onClick={handletake}>Take test</button>
    </div>
    </div>
  )
}

export default Login