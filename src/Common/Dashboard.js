import React, { useState, useEffect } from 'react'
import Dashheader from './Dashheader'
import './Dashboard.css'
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineContacts } from "react-icons/ai";
import { ImAddressBook } from "react-icons//im"
import { useNavigate } from 'react-router-dom';
import loader from '../Assets/images/blackloader.gif';
import { IconContext } from 'react-icons';

function Dashboard(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [toggleclick, settoggleclick] = useState(true)
  const [logout, setlogout] = useState(false)
  /* ----------------  side bar json   ---------------*/
  const leftdata = [{ "id": 1, "icon": <AiFillDashboard />, "name": "Dashboard" },
  { "id": 2, "icon": <AiOutlineContacts />, "name": "Manage Contact" },
  { "id": 3, "icon": <ImAddressBook />, "name": "Reports" }]
  const [holdkey, setholdkey] = useState(1)
  const toggleclass = () => {
    settoggleclick(!toggleclick)
  }

  var key;
  const togglelogout = () =>{
    setlogout(!logout)
      }
      const togglelogoutfalse = () =>
      {
        if(logout)
        {
          setlogout(false)
        }
       
      }

      const logoutfnc = () => {
        sessionStorage.removeItem("sesemail");
        localStorage.removeItem("dashboard page");
        navigate('/Login')
      }

  /* ----------------   loader and navigation ---------------*/
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

  /* ----------------  side bar highlighter  ---------------*/
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
          else {
            navigate("/Report");
          }
        }
      })
    }
  }


  

  return (

    <>
      <IconContext.Provider value={{ color: ' #898d99', size: '20px' }}>
        <div className='dashboard' onClick={togglelogoutfalse}>
          <Dashheader toggleclass={toggleclass} togglelogout={togglelogout} title={props.title} />
          {logout ? <div className='logout' onClick={logoutfnc}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" /></svg>
                  <p>Logout</p>
                </div> : null}
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
      
      {loading === true ? (<div className='loader-div'>
        <img src={loader} />
      </div>
      ) : (
        null
      )}
    </>

  )
}

export default Dashboard