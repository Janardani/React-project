import React, { useState } from 'react'
import logo from '../Assets/images/logo.png'
import toggle from '../Assets/images/toggle.png'
import bell from '../Assets/images/bell.png'
import man from '../Assets/images/man.png'
import downarrow from '../Assets/images/downarrow.png'
import './Dashboard.css'
import { Navigate, useNavigate } from 'react-router-dom'

function Dashheader({ toggleclass,title }) {

  const navigate = useNavigate();
  const [logout, setlogout] = useState(false)
  const logoutfnc = () => {
    sessionStorage.removeItem("sesemail");
    localStorage.removeItem("dashboard page");
    navigate('/Login')
  }
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
          <div className='christ d-flex flex-column align-item-baseline'>
            <div className='christ-para-div d-flex' onClick={() => setlogout(!logout)}>
              <p className='christ-para'>Chris Hemsworth</p>
              <div className='christ-down-arrow' >
                <img src={downarrow} />
                {logout ? <div className='logout' onClick={logoutfnc}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z" /></svg>
                  <p>Logout</p>
                </div> : null}
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