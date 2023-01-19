import React ,{ useState} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './../login/login.css';
import google from './../../images/icons/play-store.png';
import papswapLogo from './../../images/icons/papswapLogo.PNG';
import Phone from './Phone';
import { useAppContext } from '../../Context/appContext';
import Loader from "react-js-loader";
import "../styles/loader.css";

const Signup = () =>{
    const [useri, setUseri] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState(''); 
    const [error, setError] = useState('');
    const {signup,user,signUpError,verification, showLoader} = useAppContext();
    const navigate = useNavigate();
    if(verification){
        navigate("/");
    }else{
        if(user){
        navigate("/verifyEmail");
        }
    }
    //function to validate user
    function isUserValid(pw){
        if(pw == "") {  
            setError("**Fill the User name please!");  
            return false;  
         }    
        //minimum password length validation  
         if(pw.length < 6) {  
            setError("**User name length must be atleast 6 characters");  
            return false;  
         }  
         
       //maximum length of password validation  
         if(pw.length > 20) {  
            setError("**User name length must not exceed 20 characters");  
            return false;  
         } else {
             setError("");
            return true;  
         }  
    }
    //function to validate email
    function isEmailValid(email) {
        const emailRegexp = new RegExp(
          /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
        )
      if(!emailRegexp.test(email)){
        setError("Please provide correct email format !");
      }else{
        setError("");
      }
        return emailRegexp.test(email);
      }
      //function to validate Password
      function verifyPassword(pw) {  
        //check empty password field  
        if(pw == "") {  
           setError("**Fill the password please!");  
           return false;  
        }    
       //minimum password length validation  
        if(pw.length < 8) {  
           setError("**Password length must be atleast 8 characters");  
           return false;  
        }  
        
      //maximum length of password validation  
        if(pw.length > 15) {  
           setError("**Password length must not exceed 15 characters");  
           return false;  
        } else {
            setError("");
           return true;  
        }  
      }  
      if(showLoader){
        return(
          <>
            <div className='home-loader'>
              <div className='loader-box'>
                <div className='loader-animationd'>
                    <Loader type="spinner-circle" bgColor={"#FFFFFF"} title={"spinner-circle"} color={'#303080'} size={100} />
                </div>
                <div className='loader-content'>
                  Servers are working hard to provide your content soon !
                </div>
              </div>
            </div>
          </>
        )
      }
    return(
        <>
            <div id ="l-main">
                <div className='l-inner-box l-left'>
                    <div className='app-box'>
                        <div className='i-box'><Phone /></div>
                        <div className='get-app-box'>
                            <h1>Your Opinion Matters</h1>
                            <button>Download Mobile App</button>
                        </div>
                    </div>
                </div>
                <div className='l-inner-box l-right'>
                    <div className='l-card'>
                        <div className='l-top'>
                            <div className='l-top-b s-top'>
                                <div className='l-logo'>
                                    <div className='l-logo-img'>
                                        <img src={papswapLogo} alt="papswap logo" height='70px'/>
                                    </div>
                                    <div className='l-logo-content'>POLICIES <span>OVER</span> POLITICS</div>
                                </div>
                            </div>
                        </div>
                        <div className='l-middle s-middle'>
                            <h3>Create an account</h3>
                            <span className='l-head'>Let's make a better nation</span><br /><br />
                            <span className='l-error'>{error}{signUpError}</span>
                            <input type='text' name='user' value={useri} onChange={(e)=>{setUseri(e.target.value)}} placeholder='Username' /><br />
                            <input type='text' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Phone number or Email' /><br />
                            <input type='password' name='password' value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder='Password' /><br />
                            {/* <div className='l-s-operation'>
                                <input type='checkbox' className='l-remember' /><span className='r-span'>Remember me for a month</span>
                            </div> */}
                            <button className='l-sign-in' onClick={async ()=>{
                                try{
                                if(isEmailValid(email) && verifyPassword(pass) && isUserValid(useri)){
                                    console.log("verified", "allgood");
                                    await signup(email,pass,useri);
                                }else{
                                    console.log("verification", "some error happened");
                                }
                                }catch{

                                }
                                }
                                }>Create Account</button>
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
                        <div className='l-bottom'>Already have an account? <NavLink to="/log"><span>Sign in</span></NavLink></div>
                        <div className='terms'>
                            By creating an account you agree to Papswap <span>terms and condition.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default Signup;