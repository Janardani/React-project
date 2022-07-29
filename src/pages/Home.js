import React, { useState, useEffect } from 'react'
import { db, auth, storage } from '../firebase'
import { collection, where, onSnapshot, query, addDoc, Timestamp, orderBy, doc, deleteDoc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import User from '../Component/User'
import Message from '../Component/Message';
import Msg from '../Component/Msg';


function Home() {
  const [user, setuser] = useState("");
  const [chat, setchat] = useState("");
  const [text, settext] = useState("");
  const [msg, setmsg] = useState([]);
  const [img, setimg] = useState("");
  const [selection, setselection] = useState("")

  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const userRef = collection(db, "user");
    // query to collect the otheruser 
    const q = query(userRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let data = [];
      QuerySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      setuser(data);
    })
    return () => unsub();
  }, [])

  const selectuser = async (user) => {
    setchat(user);
    const user2 = user.uid
    setselection(user.uid)
    const id = user1 < user2 ? `${user2 + user1}` : `${user1 + user2}`;
    const msgref = collection(db, "message", id, "chat");
    const q = query(msgref, orderBy('createdAt', 'asc'))
    onSnapshot(q, QuerySnapshot => {
      let msgs = [];
      QuerySnapshot.forEach(doc => {
        msgs.push(doc.data());
      })
      setmsg(msgs)

    })
    const docsnap = await getDoc(doc(db, "lastmsg", id))
    if (docsnap.data().from !== user1) {
      await updateDoc(doc(db, "lastmsg", id), {
        status: false,
      });
    }
  };

  const selectedmsg = async (msg) => {
    const user2 = chat.uid;
    const id = user1 < user2 ? `${user2 + user1}` : `${user1 + user2}`;
    const uid = msg.uid;
    const confirm = window.confirm("Do you want to delete this chat")
    if (confirm) {
      await deleteDoc(doc(db, 'message', id, "chat", uid));
      await updateDoc(doc(db, "lastmsg", id), {
        text: " ",
      });
    }
  }

  const messagesubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 < user2 ? `${user2 + user1}` : `${user1 + user2}`;
    let url;

    if (img) {
      const imgRef = ref(storage, `image/${new Date().getTime()} - ${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      const newurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = newurl;
    }

    const adddocment = await addDoc(collection(db, "message", id, "chat"), {
      uid: "",
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    await setDoc(doc(db, "lastmsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      status: true,
    });
    settext(" ");


    const storeid = adddocment.id;
    await updateDoc(doc(db, "message", id, "chat", adddocment.id), {
      uid: storeid,
    })



  }
  return (
    <div className='main-chat'>
      <div className='leftside-chat'>  {user ? user.map(val => <User key={val.uid} user={val} user1={user1} selectuser={selectuser} selection={selection} />) : null}</div>
      <div className='rightside-chat'>{chat ? <>
        <div className='right-side-chat-wrapper'>  {(msg.length) ? msg.map((msg, i) => <Msg key={i} msg={msg} user1={user1} selectedmsg={selectedmsg} />) : null}</div>

        <Message messagesubmit={messagesubmit} text={text} settext={settext} setimg={setimg} />
      </>
        : <p className='select-user'>select user to start conversation</p>}</div>
    </div>
  )
}

export default Home