import React, { useState,useEffect} from 'react'

import Dashheader from './Dashheader'
import Dashleft from './Dashleft'
import Dashright from './Dashright'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
const navigate = useNavigate();
  const [toggleclick, settoggleclick] = useState(true)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
  useEffect(() => {
    if(sessionStorage.getItem("sesemail"))
    {
      navigate('/');
    }
    else{
      navigate('/Login')
    }
  
  }, [])
  
 
  
  return (
    

    <div className='dashboard'>
      <Dashheader toggleclass={toggleclass} />

      <div className='dash-board-head-main'>
        <div className='dash-left-main' id={toggleclick ? 'clickactive' : 'clickinactive'} ><Dashleft /></div>
        <div className='dash-right-main' id={toggleclick ? 'rightactive' : 'rightinactive'}><Dashright /></div>
      </div>

    </div>

  )
}

export default Dashboard