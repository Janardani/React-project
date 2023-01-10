import React from 'react'
import { useNavigate } from "react-router-dom"; 
import {useDispatch} from "react-redux"
import {gethtml} from "../Redux/Features/postslice"

const Maincomponent = () => {
  const dispatch = useDispatch()
    let navigate = useNavigate();
   const htmlfunction = () =>{
    // dispatch(gethtml())
    navigate("/html")
   }
  return (
    <div className='container'>
     <div onClick={ htmlfunction }>html</div>
     <div  onClick={() => navigate("/css")}>css</div>
     <div  onClick={() => navigate("/bootstrap")}>bootstrap</div>
  </div>
  )
}

export default Maincomponent