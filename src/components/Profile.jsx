import React, {useState,useEffect} from 'react';
import useri from './../images/profileImg/user4.png';
import './styles/profile.css';
import {FiSettings, FiEdit, FiCalendar} from 'react-icons/fi';
import SettingSlideBar from './SettingSlideBar';
import { useAppContext } from '../Context/appContext';
import { useProfileContext } from '../Context/profileContext';
import ProfileCard from './ProfileCard';

const Profile = () => {
    const [slideBar, setSlideBar] = useState(false);
    const {user} = useAppContext();
    const [userCreatedAt, setUserCreatedAt] =useState("");
    const [btn1, setBtn1] = useState(true);
    const [reswpaedView, setReswapedView] = useState(true);
    const {getUserReswapData,reswapedData,flamedData,getUserFlamedData} = useProfileContext();
    useEffect(()=>{
        getUserReswapData();
        getUserFlamedData();
    },[])
    function closeSlide (){
        setSlideBar(false);
    }
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date(Date(user.metadata.createdAt));
    const month =months[d.getMonth()];
    const year = d.getFullYear();
    console.log(month,year)
  return (
    <div className='profile-box'>
        <div className='profile-head'>
            <h3>Your Profile </h3>
            <span onClick={()=>setSlideBar(true)}><FiSettings /></span>
        </div>
        <div className='profile-container'>
            <div className='profile-user'>
                <div className='icon'>
                    <img src={useri} alt="user" />
                </div>
                <div className='profile-details'>
                    <div className='user-name'>{user.displayName}</div>
                    <div className='user-mail'>{user.email}</div>
                </div>
                <div className='edit-profile'><FiEdit /></div>
            </div>
            <div className='joined'> <FiCalendar /> joined {month} {year}</div>
            <div className='profile-btns'>
                <button id={btn1?"activate":"jk"} className='btn' onClick={()=>{setReswapedView(true);setBtn1(true)}}>Reswaps</button>
                <button id= {!btn1?"activate":"jk"} className='btn' onClick={()=>{setReswapedView(false);setBtn1(false)}}>Flames</button>
            </div>
            <div className='profile-content'>
            {reswpaedView &&
                <>
                {reswapedData.length===0 &&
                <>
                    <div className='no-data'>You haven't Reswaped any post yet</div>
                </>
                }
                {reswapedData.map((item, index) =>(<ProfileCard key={index} image ={item.postImg} feedImg={item.medialink} time={item.reswapedAt} content={item.postContent} feedContent={item.feedText} showComment={true}/>))}
                </>
            }
            {!reswpaedView &&
            <>
                {flamedData.length===0 &&
                <>
                    <div className='no-data'>You haven't flamed any post yet</div>
                </>
                }
                {flamedData.map((item, index) =>(<ProfileCard key={index} image ={item.postImg}  time={item.createdAt} content={item.feedText} showComment={false}/> ))}
            </>
            }

            </div>
        </div>
        {slideBar &&
        <SettingSlideBar closeSlide={closeSlide}/>
        }
    </div>
  )
}

export default Profile;