import React from 'react';
import imgs from './../images/icons/binance.png';

const Notification = ({time,content,seen,img}) => {
  return (
    <div className='notification-card'>
        <div className='notification-icon'>
            <img src={imgs} alt="icon"/>
        </div>
        <div className='notification-content'>
            <span>
                {content}
            </span><br/>
            {time}
        </div>
    </div>
  )
}

export default Notification;