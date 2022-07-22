import {createContext,useState,useEffect} from 'react'
import { onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebase'

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true)
    useEffect(() => {
onAuthStateChanged(auth, (user) =>{
    setuser(user);
    setloading(false);   
});
    }, []);
    if(loading){
        return "Loading..."
    }
  return (
   <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
  )
}

export default AuthProvider
