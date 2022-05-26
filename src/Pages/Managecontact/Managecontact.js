import React,{useState} from 'react'
import Managemain from './Managemain'
import Dashleft from '../../Common/Dashleft'
import Dashheader from '../../Common/Dashheader'

function Managecontact() {
  const [toggleclick, settoggleclick] = useState(true)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
  return (
    <div>
          <Dashheader toggleclass={toggleclass} />
        <div className='dash-board-head-main'>
        <div className='dash-left-main' id={toggleclick ? 'clickactive' : 'clickinactive'} ><Dashleft /></div>
        <div className='dash-right-main' id={toggleclick ? 'rightactive' : 'rightinactive'}><Managemain /></div>
      </div>
    </div>
  )
}

export default Managecontact