import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import "../Asset/style.css"

function Navbar() {
  const user = useContext(AuthContext);
  let navigate = useNavigate();
  const handlesignout = async () => {
    await updateDoc(doc(db, "user", auth.currentUser.uid), {
      isonline: false,
    })
    await signOut(auth);
    navigate("/login")
  }
  return (
    <nav className='d-flex navbar-div'>
      <div className='nav-div-one'>
        <h3 className='messenger'>
          <Link to="/">Messenger</Link>
        </h3>
      </div>
      <div className='nav-div-two'>
        {user ?
          (
            <>
              <h3 className='pro'>
                <Link to="/profile">Profile</Link>
              </h3>
              <h3>
                <button className='btn pur-btn' onClick={handlesignout}>logout</button>
              </h3>
            </>) :
          (
            <>
              <h3 className='pro'>
                <Link to="/register">Register</Link>
              </h3>
              <h3 className='pro'>
                <Link to="/login" >Login</Link>
              </h3>
            </>
          )
        }
      </div>

    </nav>
  )
}

export default Navbar