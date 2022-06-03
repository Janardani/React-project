import React, { useState,useEffect} from 'react'

import Dashheader from './Dashheader'
import Dashleft from './Dashleft'
import Dashright from './Dashright'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import Managecontact from '../Pages/Managecontact/Managecontact'
import Managemain from '../Pages/Managecontact/Managemain'
import Report from '../Pages/Reports/Report'


function Dashboard() {
const navigate = useNavigate();
  const [toggleclick, settoggleclick] = useState(true)
  const leftdata = [{ "id": 1, "name": "Dashboard one" },
  { "id": 2, "name": "Manage Contact" },
  { "id": 3, "name": "Reports" }]
const [holdkey, setholdkey] = useState()
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

  const getdata = (key) =>
  {
      {leftdata.filter(data => {
         if(data.id == key)
         {
             console.log("key",key ,"data id",data.id);
             setholdkey(key)
             console.log("hold key",holdkey);
             localStorage.setItem("dashboard page",key);

         }
      })}
  }
  
var key = localStorage.getItem("dahboard  key");
console.log("hold key",holdkey);
  
  return (
    <div className='dashboard'>
      <Dashheader toggleclass={toggleclass} />

      <div className='dash-board-head-main'>
        <div className='dash-left-main' id={toggleclick ? 'clickactive' : 'clickinactive'} >
        <ul style={{ listStyleType: "none" }}>
                {leftdata.map((data,key) => {

                    return (
                        <li key={key} className={((key+1) == holdkey)?'speed-head active':"speed-head"} onClick={() => getdata(key+1)}>{data.name}</li>
                    )
                })}
            </ul>
            {/* <Dashleft getdata={getdata}/> */}
        </div>


        <div className='dash-right-main' id={toggleclick ? 'rightactive' : 'rightinactive'}>
       {holdkey == 1?<Dashright /> : holdkey ==2 ? <Managemain/> : <Report/> }
          
       {/* <Dashright /> */}
          </div>
      </div>

    </div>

  )
}

export default Dashboard