import React,{useContext} from 'react'
import {AuthContext} from '../context/auth'
import { Route , Navigate} from 'react-router-dom'

const Privateroute = ({component: Component,...rest}) => {
    const {user} = useContext(AuthContext);
  return (
  <Route {...rest} exact render={(props => user ? <Component {...props} /> : <Navigate replace to="/login" />)}/>
  )
}

export default Privateroute