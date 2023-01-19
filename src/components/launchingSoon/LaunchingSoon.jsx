import React,{ useState } from "react";
import './launchingSoon.css';
import Timebox from "./Timebox";
import { db } from "../../api/config-firebase";
import {collection, getDocs, query, where, limit, addDoc,getCountFromServer} from "firebase/firestore"; 
import calender from "./calender.svg";
import city from "./city.svg";
import bike from './../../images/icons/bike.png';
import start from './../../images/icons/startup.png';
import security from './../../images/icons/security.png';
import Navbar from "../Navbar";

const LaunchingSoon =  () =>{
    const [day, setDay] = useState("00");
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [second, setSecond] = useState("00");
    const [phone, setPhone] = useState("");


    //for button
    const verify = async () => {

            //verifying if email
            function isEmailValid(phone) {
                const emailRegexp = new RegExp(
                  /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
                )
              
                return emailRegexp.test(phone);
              }
              const isPhone = !(phone.length !== 10 || isNaN(phone));
              const isMail = isEmailValid(phone);
              const valid = isPhone || isMail;
            // verifying if phone number is correct
            if( !valid ){
                document.getElementById('notify-err').innerHTML = " Please enter correct phone number or email";
            }else{

                const userRef = collection(db, "notify");
                const q =  query(userRef, where("phone", "==", phone), limit(1));
                // const users =await getCountFromServer(q);
                await getCountFromServer(q).then((da) =>{
                    // console.log(da.data().count);
                    const size = da.data().count;
                    if(size >= 1){
                        document.getElementById('notify-err').innerHTML = "This Phone number or email is already registered";
                    }else{
                         addDoc(collection(db, "notify"), {
                            phone: phone
                          }).then(()=>{
                            document.getElementById('notify-head').style.display = "none";
                            document.getElementById('notify-btn').style.display = "none";
                            document.getElementById('notify-input').style.display = "none";
                            document.getElementById('notify-err').innerHTML = " -- Thank You ! Registration Successfull --";
                            document.getElementById('notify-err').style.fontSize = "14px";
                          }).catch((err)=>{
                             document.getElementById('notify-err').innerHTML = "Some error happened! Please try again";

                          });
                          
                        
                    }
                }).catch( (err) =>{
                    document.getElementById('notify-err').innerHTML = "Some error happened! Please try again";
                    
                });
                // console.log(users);

                // const size = users.data().count;
                // console.log(size);
                // const size = 1;
                // if(size >= 1){
                //     document.getElementById('notify-err').innerHTML = "This Phone number or email is already registered";
                // }else{
                //     const docRef = await addDoc(collection(db, "notify"), {
                //         phone: phone
                //       });
                //       document.getElementById('notify-head').style.display = "none";
                //       document.getElementById('notify-btn').style.display = "none";
                //       document.getElementById('notify-input').style.display = "none";
                //     document.getElementById('notify-err').innerHTML = " -- Thank You ! Registration Successfull --";
                //     document.getElementById('notify-err').style.fontSize = "14px";
                    
                // }
      }
    }




    //for timer 
    const d = new Date("January 14, 2023 11:30:00 GMT+0530 (India Standard Time)");
    let fixedTime = d.getTime();
    fixedTime = Math.floor(fixedTime/1000);
    const cd = new Date();
    let timeNow = cd.getTime();
    timeNow = Math.floor(timeNow/1000);
    let diffsecond = fixedTime - timeNow;
    setInterval(displayTime, 1000);

    function displayTime(){
    let ps = diffsecond % 60;
    if(ps<10){
        ps = "0" + ps;
    }
    const fps = Math.floor(diffsecond/60);
    let pm = fps % 60;
    if(pm<10){
        pm = "0"+pm;
    }
     let ph = Math.floor((diffsecond/3600)%24);
    if(ph<10){
        ph = "0" + ph;
    }
    let pd = Math.floor(diffsecond/86400);
    if(pd<10){
        pd = "0" + pd;
    }
    setDay(pd);
    setHour(ph);
    setMinute(pm);
    setSecond(ps);
    diffsecond--;
    }
    return(
        <>  
        <Navbar />
            <div className="main-box container-fluid">
                <div className="inner-box left-box col-sm-12 col-md-6 col-xs-12">
                    <div className="content">
                    <div className="">
                        {/* <div  className="initial-heading"></div> */}
                        <div className="launching">LAUNCHING<br />SOON</div>
                        <div className="cards container-fluid">
                            <div className="card col-sm-10">
                                <span className="glyphicon glyphicon-record" />
                                <span>  Our Full Product & Upgraded Papswap App </span>
                            </div>
                            {/* <div className="card col-sm-10">
                                <span className="glyphicon glyphicon-record" />
                                <span> First Public Policy Event </span>
                            </div> */}
                        </div>
                        <div id = "notify" className='input-box container-fluid'>
                            <p id = "notify-head">Subscribe to get latest Notifications:</p>
                            <p id ="notify-err"></p>
                            <input id ="notify-input" type="text" onChange={(e) =>{setPhone(e.target.value)}} value ={phone} placeholder="Phone number or email"  /><br/>
                            <button id = "notify-btn" onClick={verify}>Subscribe Now</button>
                        </div>
                    </div>
                    </div>
                    <div className="whatDo">
                        <b>What we do ?</b>
                        <div>
                            1. Spreading knowledge about Government policies.
                        </div>
                        <div>
                            2. Rewarding Citizen on active and fair participation.
                        </div>
                    </div>
                    <div className="whoWe">
                        <b>Our Mission</b>
                        <div className="w-inner">
                        <div className="cd">
                            <div className="cd-img">
                                <img src={start} alt="start" />
                            </div>
                            <div className="cd-text">Supporting Startups by connecting them with right government policies.</div>
                        </div>
                        <div className="cd">
                            <div className="cd-img">
                            <img src={bike} alt="start" />
                            </div>
                            <div className="cd-text">Making a Funnel of Startups and their regional Investors.</div>
                        </div>
                        <div className="cd">
                            <div className="cd-img">
                            <img src={security} alt="start" />
                            </div>
                            <div className="cd-text">Educating Citizens to Grab the benefits of Government Policies and taking their Feedback.</div>
                        </div>
                        </div>
                    </div>
                    <div className="l-footer">
                    <b>papswap.in @ 2023</b><br/>
                    all rights reserved
                </div>
                    
                </div>
                {/* <div className="inner-box right-box col-md-6 col-sm-12 col-xs-12">
                     <div className=" clock col-sm-12">
                     {/*<div className="slogan">
                            <h2> The Show Begins In </h2>
                        </div>
                        <div className="timer">
                        <Timebox value = {day} content = "DAYS" />
                        <Timebox value = {hour} content = "HOURS" />
                        <Timebox value = {minute} content = "MINUTES" />
                        <Timebox value = {second} content = "SECONDS" />
                        </div>
                        <div className="details">
                            <div className="date details-box ">
                                <div className="detail-head">
                                <img src={calender} alt="calender" style={{"width":"20px"}} />
                               <span>Date & Time</span></div>
                               <hr />
                                <div className="detail-body">14 January, 2023 <br />11:30 AM </div>
                            </div>
                            <div className="location details-box ">
                                <div className="detail-head">
                                <img src={city} alt="calender" style={{"width":"20px"}} />
                                <span>Location</span></div>
                                <hr />
                                <div className="detail-body">Radisson City Center<br />Lucknow</div>
                            </div>
                        </div>
                    </div> 

                </div>*/}
            </div>
        </>
    );
}

export default LaunchingSoon;