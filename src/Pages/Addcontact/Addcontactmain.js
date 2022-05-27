import React,{useState} from 'react'
import Dashleft from '../../Common/Dashleft'
import Dashheader from '../../Common/Dashheader'
import Addcontact from './Addcontact'


const Addcontactmain = () => {
    const [toggleclick, settoggleclick] = useState(true)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
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