import React from 'react'
import {useNavigate} from 'react-router-dom'
import oneicon from '../Assets/images/oneicon.png'
import twoicon from '../Assets/images/twoicon.png'
import threeicon from '../Assets/images/threeicon.png'
import Managecontact from '../Pages/Managecontact/Managecontact'
import Dashboard from './Dashboard';
import Managemain from '../Pages/Managecontact/Managemain'

function Dashleft() {
    const navigate=useNavigate();
  return (
    <div>
        <div className='speed-head active row'>
            <div className='col-lg-1'>
        <div className='speed-icon '>
            <img src={oneicon}/>
        </div>
        </div>
        <div onClick={()=>{navigate("/")}} className='col-lg-10 speed-para' >Dashboard </div>
        </div>
      
      
        <div className='speed-head row'>
        <div className='col-lg-1'>
        <div className='speed-icon'>
            <img src={twoicon}/>
        </div>
        </div>
         <div className='col-lg-11 speed-para' onClick={()=>{navigate('/Managecontact')}} >Manage Contact</div> 
        </div>
        <div className='speed-head row'>
        <div className='col-lg-1'>
        <div className='speed-icon'>
            <img src={threeicon}/>
        </div>
        </div>
        <div className='col-lg-11 speed-para'>Reports</div>
    </div>
    </div>
  )
}

export default Dashleft