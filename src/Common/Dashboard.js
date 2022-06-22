import React, { useState, useEffect, Children } from 'react'
import Dashheader from './Dashheader'
import './Dashboard.css'
import {AiFillDashboard} from "react-icons/ai";
import {AiOutlineContacts} from "react-icons/ai";
import {ImAddressBook} from "react-icons//im"
import { useNavigate } from 'react-router-dom';
import loader from '../Assets/images/blackloader.gif';
import { IconContext } from 'react-icons';

function Dashboard(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [toggleclick, settoggleclick] = useState(true)
  const leftdata = [{ "id": 1,"icon":<AiFillDashboard />,"name": "Dashboard" },
  {  "id": 2, "icon":<AiOutlineContacts />,"name": "Manage Contact" },
  { "id": 3, "icon":<ImAddressBook />, "name": "Reports" }]
  const [holdkey, setholdkey] = useState(1)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }
  var key;
  useEffect(() => {
    key = localStorage.getItem("dashboard page");
    setTimeout(() => setLoading(false), 500)
    setholdkey(key);
    if (sessionStorage.getItem("sesemail")) {
      navigate('/');
    }
    else {
      navigate('/Login')
    }

  }, [])

  const getdata = (key) => {
    {
      leftdata.filter(data => {
        if (data.id == key) {
          setholdkey(key);
          localStorage.setItem("dashboard page", key);
          if (key == 1) {
            navigate('/')
          }
          else if (key == 2) {
            navigate("/Managecontact");
          }
          else{
            navigate("/Report");
          }
        }
      })
    }
  }

  return (
    <>
     <IconContext.Provider value={{ color: ' #898d99', size: '20px' }}>
    <div className='dashboard'>
      <Dashheader toggleclass={toggleclass} title={props.title}/>

      <div className='dash-board-head-main'>
        <div className='dash-left-main' id={toggleclick ? 'clickactive' : 'clickinactive'} >
          <ul style={{ listStyleType: "none" }}>
            {leftdata.map((data, key) => {
              return (
                <li key={key} className={((key + 1) == holdkey) ? 'speed-head active' : "speed-head"} onClick={() => getdata(key + 1)}>
                   <span>{data.icon}</span>
                  {data.name}
               
                </li>
              )
            })}
          </ul>
          <p className='copy-rights'>Copyright © All rights reserved.</p>
        </div>
       
        <div className='dash-right-main' id={toggleclick ? 'rightactive' : 'rightinactive'}>
      
          
             {props.children}
        
          </div>
         
         
        
          
        
      </div>
    </div>
    </IconContext.Provider>
    {loading === true ? (  <div className='loader-div'> 
     
     <img src={loader} />
  </div>
   ) : (
    null
    )}

 

</>
)
          }

export default Dashboard