import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'

const Profile = () => {

  const {user} = useContext(AppContext)

  return (
    <div className='text-center' style={{marginTop:"120px"}}>
      <h2>Welcome, {user?.name}</h2>
      <h3>{user?.email}</h3>
    </div>
  )
}

export default Profile
