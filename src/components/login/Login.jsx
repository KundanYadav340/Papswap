import React ,{ useState} from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import './login.css';
import google from './../../images/icons/play-store.png';
import papswapLogo from './../../images/icons/papswapLogo.PNG';
import {useAppContext} from './../../Context/appContext';
import Loader from "react-js-loader";

const Login = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState(''); 
    const {user,login,signInError,verification} = useAppContext();
    const navigate = useNavigate();
    if(verification){
        navigate("/");
    }else{
        if(user){
        navigate("/verifyEmail");
        }
    }
    return(
        <>
            {/* <div className={"item"}>
                <Loader type="spinner-circle" bgColor={"#FFFFFF"} title={"spinner-circle"} color={'#FFFFFF'} size={100} />
            </div> */}
            <div id ="l-main">
                <div className='l-inner-box l-left'></div>
                <div className='l-inner-box l-right'>
                    <div className='l-card'>
                        <div className='l-top'>
                            <div className='l-top-b'>
                                <div className='l-logo'>
                                    <div className='l-logo-img'>
                                        <img src={papswapLogo} alt="papswap logo" height='70px'/>
                                    </div>
                                    <div className='l-logo-content'>POLICIES <span>OVER</span> POLITICS</div>
                                </div>
                            </div>
                        </div>
                        <div className='l-middle'>
                            <h3>Welcome Back!</h3>
                            <span className='l-head'>Please enter your details</span><br /><br />
                            <span className='l-error'>{signInError}</span>
                            <input type='text' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Phone number or Email' /><br />
                            <input type='password' name='password' value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder='Password' /><br />
                            <div className='l-operation'>
                                <span className='l-forgot'>forgot password?</span><br/>
                                <div>
                                <input type='checkbox' className='l-remember' /><span className='l-r-span'>Remember me for a month</span>
                                </div>
                            </div>
                            <button className='l-sign-in' onClick={()=>login(email,pass)}>Sign in</button>
                            <div className='l-separator'>
                                <div className='l-s-left l-line'></div>
                                <div className='l-s-middle'>get app</div>
                                <div className='l-s-right l-line'></div>
                            </div>
                            <div className='l-g-btn'>
                                <div className='l-g-logo'>
                                    <img src={google} alt='logo' width='16px' />
                                </div>
                                <div className='l-g-content'>Get App Now</div>
                            </div>
                        </div>
                        <div className='l-bottom'>Don't have an account? <NavLink to="/signUp"><span>Signup</span></NavLink></div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default Login;