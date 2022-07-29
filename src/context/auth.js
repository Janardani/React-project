import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import Loader from '../Component/Loader';

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setuser(user);
            setloading(false);
        });
    }, []);

    if (loading) {
        return <Loader />
    }
    return (
        <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
    )
}

export default AuthProvider
