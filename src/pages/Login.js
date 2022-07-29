import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore"
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import '../Asset/style.css'


const Login = () => {
  const [data, setdata] = useState({ email: "", password: "", error: null, loading: false });
  let navigate = useNavigate();
  const { email, password, error, loading } = data;
  const datachange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }
  const clicksubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setdata({ ...data, error: "enter all values" });
    }
    setdata({ ...data, error: null, loading: true });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, 'user', result.user.uid), {
        isonline: true,
      });
      setdata({ name: "", email: "", password: "", error: null, loading: false });
      navigate("/");
    }
    catch (err) {
      setdata({ ...data, error: err.message, loading: false });
    }

  }
  return (
    <form onSubmit={clicksubmit}>
      <div className='login-main'>
        <div className='login'>
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={email} onChange={datachange} />
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" value={password} onChange={datachange} />
          {error ? <p>{error}</p> : null}
          <button className='btn login-btn' disabled={loading}>Login</button>
        </div>
      </div>
    </form>
  )
}

export default Login