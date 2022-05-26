import React, { useState} from 'react'

import Dashheader from './Dashheader'
import Dashleft from './Dashleft'
import Dashright from './Dashright'
import './Dashboard.css'

function Dashboard() {

  const [toggleclick, settoggleclick] = useState(true)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
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