import React from 'react';

const UserProfile = ({userImg, auth, userName}) => {
    if(!auth){return <button>Sign In</button>}
  return (
    <div className='profile-show'>
                    <img src={userImg} alt="user" />
                        <span>{userName}</span>
                </div>
  )
}

export default UserProfile;