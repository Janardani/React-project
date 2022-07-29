import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore"
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import '../Asset/style.css'


const Register = () => {
  const [data, setdata] = useState({ name: "", email: "", password: "", error: null, loading: false });
  let navigate = useNavigate();
  const { name, email, password, error, loading } = data;
  const datachange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  }
  const clicksubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setdata({ ...data, error: "enter all values" });
    }
    setdata({ ...data, error: null, loading: true });
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'user', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createAt: Timestamp.fromDate(new Date()),
        isonline: true,
        bio: ""
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
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" value={name} onChange={datachange} />
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" value={email} onChange={datachange} />
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" value={password} onChange={datachange} />
          {error ? <p>{error}</p> : null}
          <button className='btn login-btn' disabled={loading}>Register</button>
        </div>
      </div>
    </form>
  )
}

export default Register