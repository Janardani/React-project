import React ,{useState,useEffect}from 'react'
import {db,auth} from '../firebase'
import {collection,where,onSnapshot, query} from 'firebase/firestore'
import User from '../Component/User'

function Home() {
  const [user, setuser] = useState("")
  useEffect(() => {
        const userRef = collection(db,"user");
        // query to collect the otheruser 
        const q = query(userRef,where("uid","not-in",[auth.currentUser.uid]));
const unsub = onSnapshot(q,(QuerySnapshot) => {
  let data = [];
  QuerySnapshot.forEach((doc) =>{
    data.push(doc.data())
  });
  setuser(data);
})
return() => unsub();
  }, [])
  console.log("user",user);
  return (
    <div>
    {user? user.map(val => <User key={val.uid} user={val}/>) : null}
    </div>
  )
}

export default Home