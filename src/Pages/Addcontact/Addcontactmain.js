import React,{useState,useEffect} from 'react'
import Dashleft from '../../Common/Dashleft'
import Dashheader from '../../Common/Dashheader'
import Addcontact from './Addcontact'
import { useNavigate } from 'react-router-dom'


const Addcontactmain = () => {
  const navigate = useNavigate();
    const [toggleclick, settoggleclick] = useState(true)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
  useEffect(() => {
    if(sessionStorage.getItem("sesemail"))
    {
      navigate('/Addcontact');
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
        <div className='dash-right-main' id={toggleclick ? 'rightactive' : 'rightinactive'}><Addcontact/></div>
      </div>
    </>
  )
}

export default Addcontactmain