import React,{useEffect,useState} from 'react';
import papswap from './../images/icons/papswapLogo.PNG';


const Navbar2 = ({show, showFilter, closeFilter}) =>{
    // const [toggle, settoggle] = useState(0);
    // const [ref, setref] = useState(true);
    // useEffect(() => {
    //     if(!ref){
    //     if(toggle===0){
    //         document.getElementsByClassName('ministry-box')[0].style.display ="none";
    //         document.getElementsByClassName('ministry-filter')[0].style.display="block";  
    //         document.getElementsByClassName('close-filter')[0].style.display="none";
    //     }else{
    //         document.getElementsByClassName('ministry-box')[0].style.display ="block";
    //         document.getElementsByClassName('ministry-filter')[0].style.display="none";  
    //         document.getElementsByClassName('close-filter')[0].style.display="block";
    //     }
    //     }
    //   }, [toggle,ref]);
    
    // function seeFilter(target){
    //     setref(false);
    //     settoggle(1);
    // }
    // function closeFilter(target){
    //     settoggle(0);
    // }
    return(
        <>
            <div className="nav-main-box">
                <div className="logo-box">
                    <img src = {papswap} alt="logo" />
                    <span><b>PapSwap</b><br />
                    </span>
                </div>
                <div className="buttons">
                    <div className='main-btns'>
                    <div className='mf-btns'>
                    {show &&
                    <button className="ministry-filter" onClick={showFilter}><i className='material-icons'>filter_list</i></button>
                    }
                    {!show &&
                    <button className="close-filter" onClick={closeFilter}><i className='material-icons'>close</i></button>
                    }
                    </div>
                    <button>Posts</button>
                    <button>Blogs</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Navbar2;