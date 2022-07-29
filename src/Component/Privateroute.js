import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate, Outlet } from 'react-router-dom'

const Privateroute = () => {
  const user = useContext(AuthContext);
  return (
    user ? <Outlet /> : <Navigate to="/login" />

  )
}

export default Privateroute