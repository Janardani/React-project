import React from 'react'
import { MdFileUpload } from "react-icons/md";
import { MdSend } from "react-icons/md"

const Message = ({ messagesubmit, text, settext, setimg }) => {
  return (
    <form onSubmit={messagesubmit}>
      <div className='message-send  position-absolute bottom-0'>
        <div className='message-send-wrapper d-flex'>
          <label htmlFor='img' className='upload-svg'><MdFileUpload /></label>
          <input type="file" accept='image/*' id='img' style={{ display: "none" }} onChange={e => setimg(e.target.files[0])} />
          <input type="text" placeholder='Type message here' value={text} onChange={event => settext(event.target.value)} className="send-text-box form-control" />
          <div className='upload-svg'><button className='btn'><MdSend /></button></div>
        </div>
      </div>

    </form>
  )
}

export default Message