import React , {useContext} from 'react'
import { Link } from "react-router-dom"
import {auth , db} from '../firebase'
import {signOut} from 'firebase/auth'
import { updateDoc,doc} from 'firebase/firestore'
import {AuthContext} from '../context/auth'
import {useNavigate} from 'react-router-dom'

function Navbar() {
  const user = useContext(AuthContext);
  console.log("user",user);
  let navigate = useNavigate();
  const handlesignout = async () =>
  {
    await updateDoc(doc(db, "user" ,auth.currentUser.uid),{
isonline: false,
    })
    await  signOut(auth);
    navigate("/login")
  }
  return (
    <nav className='d-flex navbar-div'>
        <h3>
            <Link to="/">Messenger</Link>
        </h3>
        {user ?
     ( <>
       <h3>
        <Link to="/profile">Profile</Link>
        </h3>
        <h3>
       <button className='btn btn-primary' onClick={handlesignout}>logout</button>
        </h3> 
      </> ) :
      (
        <>
      <h3>
        <Link to="/register">Register</Link>
        </h3>
        <h3>
        <Link to="/login">Login</Link>
        </h3>
      </>
      )
      }
      
    </nav>
  )
}

export default Navbar