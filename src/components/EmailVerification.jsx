import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/appContext';
import './styles/emailVerification.css';

const EmailVerification = () => {
    const {verifiedLoginNow,verification,user,logout,sendEmailToVerify, error3} = useAppContext();
    const navigate = useNavigate();
    if(!user){
      navigate("/signUp");
    }
    if(verification){
      navigate("/");
    }
  return (
    <div className='email-verification-div'>
        <h3>An Email Confirmation Message is sent to provided email</h3>
        <h5>Verify that email then click button given below</h5>
        <b>{error3}</b>
        <button className='verified-btn' onClick={()=>verifiedLoginNow()}>Verified Now go to home</button><br/>
        <button className ='resend-mail' onClick={()=>sendEmailToVerify()}>Resend confirmational email</button><br/>
        <button className='goto-login' onClick={()=>logout()}>Go to Login now</button>

    </div>
  )
}

export default EmailVerification;