import React from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import './styles/notification.css';
import { HiArrowNarrowLeft} from 'react-icons/hi'
const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className='notification-box'>
    <div className='notification-head'>
        <span onClick={()=>navigate(-1)}><HiArrowNarrowLeft/></span>
        <h3>Notifications</h3>
        </div>
        <div className='notification-container'>
        <b>New</b>
        <Notification seen="false" time="10:13 AM, 20 Nov 2022" content="Your account is created as Kundan Yadav." />
        <Notification seen="false" time="10:13 AM, 20 Nov 2022" content="Your Password is changed from apple iphone 12." />
        <Notification seen="false" time="10:13 AM, 20 Nov 2022" content="Account sign in on another device Xiomi note 7 pro. Report if not done by you" />
        <Notification seen="false" time="10:13 AM, 20 Nov 2022" content="Your account is created as Kundan Yadav." />
        <b>Seen</b>
        <Notification seen="true" time="10:13 AM, 20 Nov 2022" content="Your account is created as Kundan Yadav." />
        <Notification seen="true" time="10:13 AM, 20 Nov 2022" content="Your account is created as Kundan Yadav." />
        <Notification seen="true" time="10:13 AM, 20 Nov 2022" content="Your account is created as Kundan Yadav." />
        <Notification seen="true" time="10:13 AM, 20 Nov 2022" content="Your account is created as Kundan Yadav." />
        </div>
    </div>
  )
}

export default Notifications;