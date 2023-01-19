import React,{useEffect, useState} from 'react';
import { NavLink} from 'react-router-dom';
import {FaHome, FaWallet, FaBell, FaUser, FaBars} from 'react-icons/fa';

const Sidebar = () => {
    const [active , setActive] = useState(0);
    useEffect(()=>{
      const btns = document.getElementsByClassName('list-buttons');
      btns[0].classList.add('active');
    },[])
    useEffect(() =>{
        const btns = document.getElementsByClassName('list-buttons');
        for(var i=0; i<btns.length; i++){
            btns[i].classList.remove('active');
        }
        btns[active].classList.add('active');
      },[active]);
  return (
    <div className='list-box'>
                    <NavLink to="/">
                    <button className='list-buttons' onClick={()=>{setActive(0)}}>
                    <i className="material-icons"><FaHome /></i><span>Home</span>
                    </button>
                    </NavLink>
                    <NavLink to="/wallet">
                    <button className='list-buttons'  onClick={()=>{setActive(1)}}>
                    <i className="material-icons"><FaWallet /></i><span>Wallet</span>
                    </button>
                    </NavLink>
                    <NavLink to="/notifications">
                    <button className='list-buttons'  onClick={()=>{setActive(2)}}>
                    <i className="material-icons"><FaBell/></i><span>Notifications</span>
                    </button>
                    </NavLink>
                    <NavLink to="/profile">
                    <button className='list-buttons'  onClick={()=>{setActive(3)}}>
                    <i className="material-icons"><FaUser /></i><span>Profile</span>
                    </button>
                    </NavLink>
                    {/* <button className='list-buttons list-button-down'>
                    <i className="material-icons"><FaBars /></i><span>More</span>
                    </button> */}
                </div>
  )
}

export default Sidebar;