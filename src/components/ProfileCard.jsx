import React from 'react'

const ProfileCard = (props) => {
  return (
    <div className='profile-poster'>
        <div className='feed-txt'>{props.content}</div>
        <div className='poster-img'>
            <img src={props.image} alt="reswaps flames"/>
        </div>
        {props.showComment &&
        <div className='feed'><span><b>Your Opinion:</b></span><br/>
        <div className='feed-para'>
        {props.feedImg &&
        <img className='feed-img' src={props.feedImg} alt="feed" />
        }
        {props.feedContent}
        </div>
        </div>
        }
    </div>
  )
}

export default ProfileCard;