import React, { useRef, useEffect } from 'react'
import Moment from 'react-moment'

const Msg = ({ msg, user1, selectedmsg }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msg]);

  return (
    <div className={msg.from === user1 ? "message user-one" : "message user-two"} ref={scrollRef} onClick={() => selectedmsg(msg)}>
      {msg.media ? <img src={msg.media} alt="image here" /> : null}
      <p className='msg-text'>{msg.text}</p>
      <p className='msg-time'>
        <Moment fromNow>{msg.createdAt.toDate()}</Moment>
      </p>
    </div>
  )
}

export default Msg