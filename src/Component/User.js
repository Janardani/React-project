import React, { useState, useEffect } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Profile from '../Asset/images/profile.png'

const User = ({ user1, user, selectuser, selection }) => {
  const user2 = user.uid;
  const [data, setdata] = useState("");

  useEffect(() => {
    const id = user1 < user2 ? `${user2 + user1}` : `${user1 + user2}`;
    let unsub = onSnapshot(doc(db, "lastmsg", id), (doc) => {
      setdata(doc.data());
    });
    return () => unsub();
  }, [])

  return (
    <div onClick={() => selectuser(user)} className={user.uid === selection ? "selected-side-bar-main" : ""}>
      <div className='side-bar-main'>
        <div className='profile-img'> <img src={user.avatar || Profile} alt="profile" /></div>
        <p className='side-name'>{user.name}</p>
        <p className={(user.isonline) ? "side-sts side-yes" : "side-sts side-no"}></p>
      </div>
      <div className='unread-msg'>
        {data ?
          <>
            <span>{(data.from === user1) && (data.text !== " ") ? "Me:" : null}</span>
            <span>  {data.text}</span>
          </>
          : null}
      </div>

    </div>
  )
}

export default User