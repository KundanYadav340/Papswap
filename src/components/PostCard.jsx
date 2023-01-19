import React from "react";
import { useHomeContext } from "../Context/homeContext";
const PostCard = (props) =>{
    const {flameFunction} = useHomeContext();
    function relativeDays(timestamp) {
        const rtf = new Intl.RelativeTimeFormat('en', {
          numeric: 'auto',
        });
        const oneDayInMs = 1000 * 60 * 60 * 24;
        const daysDifference = Math.round(
          (timestamp - new Date().getTime()) / oneDayInMs,
        );
      
        return rtf.format(daysDifference, 'day');
      }
      const relativeTime = relativeDays(props.time.seconds*1000);
    //   console.log(new Date((props.time.seconds*1000)).getTime());
    return(
        <>
            <div className="post-card">
                <div className="post-user">
                    <div className="post-profile">
                        <img src={props.creator_img} alt="profile"/>
                        <span>PapSwap_official</span>
                    </div>
                    {/* <button><i className="material-icons">more_horiz</i></button> */}
                </div>
                <div className="post-content">
                    <p className="post-para line-clamp">
                        {props.content}
                    </p>
                    <span className="see-btns more" onClick={(target)=>{target.target.style.display="none";
                    target.target.parentElement.children[2].style.display="inline";
                    target.target.parentElement.children[0].classList.remove('line-clamp');
                    }}>see more</span>
                    <span className="see-btns less" 
                         onClick={(target)=>{target.target.style.display="none";
                        target.target.parentElement.children[1].style.display="inline";
                        target.target.parentElement.children[0].classList.add('line-clamp');
                        
                        }}
                    
                    >see less</span>

                </div>
                <div className="post-img">
                    <img src = {props.image} alt="post content"/>
                </div>
                <div className="accessibility">
                    <div className="react-btns">
                        <section className="left-grp">
                            <button onClick={()=>flameFunction(props.id,props.liked,props.flames,props.content,props.image)}><i className="material-icons" style={{color:props.liked?"orangered":"#303030"}}>local_fire_department</i><br/>{props.flames}</button>
                            <button><i className="material-icons">diversity_1</i><br/>1.3k</button>
                            <button id={props.image} className="reswap-btn"
                            onClick={async (e)=>{
                                await props.reswap(props.image, props.content, props.id);
                            }}
                            ><i id={props.image} className="material-icons">sync_alt</i><br/>{props.swaps}</button>
                        </section>
                        <section className="right-grp">
                            {/* <button><i className="material-icons">share</i><br/></button> */}
                        </section>
                        <div className="see-comment">
                            View all 733 beneficiary
                        </div>
                        <div className="posted-at">
                            {relativeTime}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PostCard;