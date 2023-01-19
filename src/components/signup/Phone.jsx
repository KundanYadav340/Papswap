import React from "react";
import img1 from './1666805802897.jpg';
import img2 from './1666805802891.jpg';
import img3 from './1666805802882.jpg';
import img4 from './1666805802887.jpg';



const Phone = () =>{
    return(
    <>
        <div className="iphone">
            <div className="border">
                <div className="top-left"></div>
                <div className="top-right"></div>
                <div className="bottom-left"></div>
                <div className="bottom-right"></div>
                <div className="top"></div>
                <div className="bottom"></div>
                <div className="left"></div>
                <div className="right"></div>
            </div>
            <div className="mute aside-btn"></div>
            <div className="volume-plus aside-btn"></div>
            <div className="volume-minus aside-btn"></div>
            <div className="block-button aside-btn"></div>
            <div className="front-body">
                <div className="front-cam"></div>
                <div className="speaker"></div>
                <div className="home-button"></div>
                <div className="screen">
                    <div className="content-top">
                        <div className="operator">
                            <div className="level">
                                <div className="level-item"></div>
                                <div className="level-item"></div>
                                <div className="level-item"></div>
                                <div className="level-item"></div>
                                <div className="level-item"></div>
                            </div>
                            <div className="name">Mobile</div>
                        </div>
                        <div className="battery">
                            <div className="percentage">58%</div>
                            <div className="level"></div>
                        </div>
                    </div>
                    <div className="img-container">
                        <img className="bgi-img bgi-img-1" src={img1} alt="screen"/>
                        <img className="bgi-img bgi-img-2" src={img2} alt="screen" />
                        <img className="bgi-img bgi-img-3" src={img3} alt="screen" />
                        <img className="bgi-img bgi-img-4" src={img4} alt="screen" />
                        <img className="bgi-img bgi-img-1" src={img1} alt="screen" />
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default Phone;