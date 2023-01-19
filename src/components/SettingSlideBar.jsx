import React from 'react';
import { IoIosClose } from 'react-icons/io';
import './styles/settingSlidebar.css';
import { useAppContext } from '../Context/appContext';
import { useProfileContext } from '../Context/profileContext';
import {RiLockPasswordLine,RiLogoutCircleLine,RiChatQuoteLine,RiPagesLine} from 'react-icons/ri';

const SettingSlideBar = ({closeSlide}) => {
    const {logout} = useAppContext();
    const {resetPassword} = useProfileContext();
  return (
    <div className='setting-slide'>
        <div className='head'>
            <h4>Settings</h4>
            <span onClick={closeSlide}><IoIosClose /></span>
        </div>
        <div className='button-box'>
            <button ><span><RiChatQuoteLine/></span>FAQ</button><br/>
            <button ><span><RiPagesLine/></span>Terms and Conditions</button><br/>
            <button onClick={()=>resetPassword()} ><span><RiLockPasswordLine/></span>Reset Password</button><br/>
            <button className='logout-btn' onClick={()=>logout()} ><span><RiLogoutCircleLine/></span>Logout</button>
            
        </div>
    </div>
  )
}

export default SettingSlideBar;