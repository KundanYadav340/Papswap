import React, {useState, useEffect} from 'react';
import Navbar2 from './Navbar2';
import Reswap from './Reswap';
import './styles/loader.css';
import userImg from './../images/profileImg/user4.png';
import PostCard from './PostCard';
import data from './data/postData';
import {collection, getDocs, query, where, addDoc,limit,orderBy, collectionGroup} from "firebase/firestore"; 
import UserProfile from './UserProfile';
import MinistryList from './MinistryList';
import { db } from '../api/config-firebase';
import {useAppContext } from '../Context/appContext';
import { useHomeContext } from '../Context/homeContext';

const HomePage = () =>{
    const [show, setShow] = useState(false);
    const [reswapI, setReswapI] = useState('');
    const [reswapFeed, setReswapFeed] = useState('');
    const [reswapId, setReswapId] = useState('');
    const[ministry ,setMinistry] = useState(true);
    const[comments, setComments] = useState([]);
    const [fref, setFref] = useState(true);
    const {userData}  = useAppContext();
    const {filterPost,filterPostData,getPostData, isLoadingPostData,isLoadingFilterData,getMore,isDataEmpty,isFilterDataEmpty,filterCategory } = useHomeContext();
      useEffect(() => {
        const collection = document.getElementsByClassName('post-para');
        console.log(collection.length);
        for(var i=0; i<collection.length; i++){
            if (collection[i].offsetHeight < collection[i].scrollHeight) {
                collection[i].parentElement.children[1].style.display="inline";
            } else {
                collection[i].parentElement.children[1].style.display="none";
            }
        }
      }, [userData,filterPost]);
      // useEffect(()=>{
      //   getComments();
      // },[]);
      // useEffect(()=>{
      //   console.log('reswaps', comments);
      // },[comments]);
      //   const  getComments = async () =>{
      //       const userRef = collectionGroup(db,"comments");
      //       const q =  query(userRef, where("commenterid", "==", "3v8dqBarQ7X9A4mhqKiU75jFFC33"));
      //       const snapshot = await getDocs(q);
      //        setComments(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
      //       };
      function showReswap (i ,f, id){
        setShow(true);
        setReswapI(i);
        setReswapFeed(f);
        setReswapId(id);
      }
      function closeReswap(){
        setShow(false);
      }
      const showFilter = () =>{
        setMinistry(false);
      }
      const closeFilter = () =>{
        setMinistry(true);
      }
      if(isLoadingPostData){
        return(
          <>
            <div className='home-loader'>
              <div className='loader-box'>
                <div className='loader-animation'>
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
        <Navbar2 show={ministry} showFilter={showFilter} closeFilter={closeFilter}/>
        <div className='flex-container homePage'>
            {/* <div className='flex-items left'>
                
            </div> */}
            <div className='flex-items middle'>
              {isLoadingFilterData &&
                <>
                <div className='filter-animation'>
                  <div className='loader-box'>
                    <div className='loader-animation'>
                    </div>
                    <div className='loader-content'>
                      No Patience exam today<br/>
                      Filtering Products
                    </div>
                  </div>
                </div>
                </>
              }
                <div className='post-box'>
                    {filterPost.map((item, index) =>(<PostCard id={item.post_id} key={index} liked={item.flamed} image ={item.medialink} creator_img={item.creater_img} time={item.createdAt}swaps={item.swaps} flames={item.flames} name={item.creater_name} content={item.feedtext} reswap ={showReswap}/>))}
                </div>
            </div>
            <div className='flex-items right' >
                <UserProfile userImg={userData.userImage} auth={true} userName={userData.userName} userMail={userData.userEmail} />
                <MinistryList showm={ministry} closeFilter={closeFilter} />
            </div>
        </div>
        <div className={show ? 'reswap-main-box' : 'reswap-main-box hidden'}>
        <div className='reswap-box'>
            <div className='reswap-top'>
                <span>Reswap</span>
                <button onClick={()=>setShow(false)}><i className='material-icons'>close</i></button>
            </div>
            <Reswap img={userData.userImage} user={userData.userName} postImg={reswapI} postContent={reswapFeed} postId={reswapId} close={closeReswap}/>

        </div>
        </div>
        <div className='get-more'>
        {!isFilterDataEmpty &&
          <button onClick={getMore} >Get More Posts</button>
        }
        </div>
        </>
    );
}
export default HomePage;