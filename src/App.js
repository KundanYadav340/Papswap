import React from 'react';
import {Routes, Route} from 'react-router-dom';
// import ComingSoon from './components/comingSoon/ComingSoon';
import LaunchingSoon from './components/launchingSoon/LaunchingSoon';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import Wallet from './components/Wallet';
import Notifications from './components/Notifications';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Profile from './components/Profile';
import EmailVerification from './components/EmailVerification';
import PrivateComponents from './components/PrivateComponents';
import {useAppContext} from './Context/appContext';

const App = () => {
  const {user,verification} = useAppContext();
  return (
    <>
      <div className='app-main-box'>
      {verification &&
        <div className='sidebar-box'>
          <Sidebar />
        </div>
      }
        <div className='content-main-box'>
        {/* {verification &&
          <div className='sidebar-hide-area'></div>
        } */}
          <div className='content-box'>
          <ScrollToTop>
          <Routes>
            {/* <Route path="/la" element={<PrivateComponents><HomePage /></PrivateComponents>} /> */}
            <Route path="/" element={<LaunchingSoon />} />
            {/* <Route path="/wallet" element={<PrivateComponents><Wallet /></PrivateComponents>} />
            <Route path="/notifications" element={<PrivateComponents><Notifications /></PrivateComponents>} />
            <Route path="/profile" element={<PrivateComponents><Profile/></PrivateComponents>} />
            <Route path="/log" element={<Login />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path='/verifyEmail' element={<EmailVerification/>} /> */}
          </Routes>
          </ScrollToTop>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
