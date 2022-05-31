import React,{useState,useEffect} from 'react'
import Dashleft from '../../Common/Dashleft'
import Dashheader from '../../Common/Dashheader'

import { useNavigate } from 'react-router-dom'
import Contactinformation from './Contactinformation'


const Contactinformationmain = () => {
  const navigate = useNavigate();
    const [toggleclick, settoggleclick] = useState(true)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
  useEffect(() => {
    if(sessionStorage.getItem("sesemail"))
    {
      navigate('/Contactinformation');
    }
    else{
      navigate('/Login')
    }
  }, [])
  
  return (
    <>
  <Dashheader toggleclass={toggleclass} />
        <div className='dash-board-head-main'>
        <div className='dash-left-main' id={toggleclick ? 'clickactive' : 'clickinactive'} ><Dashleft /></div>
        <div className='dash-right-main' id={toggleclick ? 'rightactive' : 'rightinactive'}><Contactinformation/></div>
      </div>
    </>
  )
}

export default Contactinformationmain