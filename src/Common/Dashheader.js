import React, { useState, useEffect } from 'react'
import logo from '../Assets/images/logo.png'
import toggle from '../Assets/images/toggle.png'
import bell from '../Assets/images/bell.png'
import man from '../Assets/images/man.png'
import downarrow from '../Assets/images/downarrow.png'
import './Dashboard.css'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashheader({ toggleclass, title,togglelogout }) {

  const navigate = useNavigate();

  const [user, setuser] = useState({})

  useEffect(() => {
    let id = sessionStorage.getItem("sesemail")
    axios.get(`http://localhost:8001/User/${id}`).then(res => setuser(res.data))

  }, [])

 
  return (
 
    <div className='dash-header d-flex align-items-baseline'>

      <div className='dash-head-one col-lg-3 d-flex'>
        <div className='dash-head-logo'>
          <img src={logo} />
        </div>
        <h3 className="business-card">NFC BUSINESS <span className="black-clr">CARD</span> </h3>
      </div>
      <div className='dash-head-two col-lg-9 d-flex justify-content-between'>
        <div className='col-lg-6 d-flex align-items-center '>
          <div className='toggle-icon' onClick={toggleclass}>
            <img src={toggle} />
          </div>
          <p className='dash-para'>{title}</p>
        </div>
        <div className='col-lg-3 d-flex man-head align-items-center'>
          <div className='bell-main'>
            <div className='bell'>
              <img src={bell} />
            </div>
          </div>
          <div className='man-img'>
            <img src={man} />
          </div>
          <div className='christ d-flex flex-column align-item-baseline' onClick={togglelogout}>
            <div className='christ-para-div d-flex' >
              <p className='christ-para'>{user.name}</p>
              <div className='christ-down-arrow' >
                <img src={downarrow} />

              </div>
            </div>
            <p className='christ-super'>Super Admin</p>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
 
  )
}

export default Dashheader