import React from 'react'

const User = ({user}) => {
  return (
    <div>
        <h4>{user.name}</h4>
        <h4>{(user.isonline)?"yes":"no"}</h4>
    </div>
  )
}

export default User