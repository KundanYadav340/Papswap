import React from "react";
import papswap from './../images/icons/papswapLogo.PNG';

const Navbar = () =>{
    const styles = {
        navbar:{
            width:"100%",
            display:"flex",
            flexDirection:"row",
            borderBottom:"1px solid #d1d1d1",
            margin:"0px",
            boxShadow:"3px 3px 10px #d1d1d1",
            borderRadius:"0px"
        },
        logoBox:{
            width:"50%",
            padding:"10px",
            alignContent:"center",
            marginLeft:"10px"
        },
        image:{
            width:"25px"
        },
        qwedrt:{
            marginLeft:"10px",
            fontSize:"18px",
            color:"maroon",
        },
        buttons:{
            width:"40%",
            alignText:"right"
        },
        navBtns:{
            padding:"8px",
            width:"120px",
            border:"none",
            borderRadius:"8px",
            backgroundColor:"darkblue",
            color:"white",
            fontFamily:"sans-serif",
            verticalAlign:"middle",
            marginTop:"12px",
            marginBottom:"12px",
            marginRight:"5px",
            float:"right"
        }
    };
    return(
        <>
            <div className="navbar" style={styles.navbar}>
                <div className="logo-box" style={styles.logoBox}>
                    <img src = {papswap} alt="logo" style={styles.image} />
                    <span style={styles.qwedrt}><b>PapSwap</b><br />
                    </span>
                </div>
                {/* <div className="buttons" style={styles.buttons}>
                    <button className="nav-btns" style ={styles.navBtns}>About</button>
                </div> */}
            </div>
        </>
    );
}
export default Navbar;