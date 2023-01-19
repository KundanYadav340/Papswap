import React,{useEffect,useState} from 'react';
import {useHomeContext} from '../Context/homeContext';
import { db ,storage} from '../api/config-firebase';
import {collection, getDocs,getDoc, query,deleteDoc,doc, where,setDoc, addDoc,updateDoc,limit,orderBy,startAfter, collectionGroup, arrayRemove, serverTimestamp} from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import {v4} from "uuid";
import { useAppContext } from '../Context/appContext';

function Reswap(props) {
    const[img, setImg] = useState("");
    const [feedText, setFeedText] = useState("");
    const [uploadImg, setUploadImg] =useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [uploadPart, setUploadPart] = useState(false);
    const {user} = useAppContext();
    const [feedImg, setFeedImg] = useState();
    useEffect(()=>
    {
        setImg(props.postImg);
    },[props.postImg]);
    const insertReswapedData =async (postId, postImg, feedContent, url) =>{
        const userRef = collection(db,"Posts",postId,"comments");
        await addDoc (userRef,{
        createdAt:new Date(),
        commenterid:user.uid,
        feedtext:feedText,
        medialink:url,
        postId:postId,
        postImg:postImg,
        postContent:feedContent
        
        }).then( async (snapshot)=>{
            console.log(snapshot.id);
            const washingtonRef = doc(db, "Posts",postId, "comments", snapshot.id);
            await updateDoc(washingtonRef, {
            comment_id: snapshot.id,
            medialink:url
            }).then(()=>{
            })
            const userRef = doc(db,"users",user.uid,"reswaps",snapshot.id);
            await setDoc (userRef,{
                reswapedAt:new Date(),
                postId:postId,
                comment_id:snapshot.id,
                medialink:url,
                feedText:feedText,
                postContent:feedContent,
                postImg:postImg
            })
        })
        .catch((err)=>{console.log(err)});
        setFeedText("");
        setUploadImg(null);
        document.getElementById("upload-in").value=null;
        setUploadPart(false);
        props.close();
    }
    const reswapFunction = async (postId, postImg, feedContent) =>{
        setUploadPart(true);
        console.log("reswapping");
        if(uploadImg !=null){
            const storageRef = ref(storage, `reswapedImg/${ uploadImg.name +v4()}`);
            await uploadBytes(storageRef, uploadImg).then(async (snapshot)=>{
                console.log(snapshot);
                await getDownloadURL(snapshot.ref).then(async (url)=>{
                    setImgUrl(url);
                    await  insertReswapedData(postId, postImg, feedContent,url);
                })
            }).catch((err)=>{console.log("reswap img upload" , err)});
        }else{
            await  insertReswapedData(postId, postImg, feedContent, "");
        }
    }
  return (
    <>
        <div className='reswap-user'>
            <div className='reswap-details'>
                <img src={props.img} alt='user'></img>
                <span><span>Reswaping as </span><b>{props.user}</b></span>
            </div>
        </div>
        {/* <div>
            {props.postContent}<br/>
            {props.postId}
        </div> */}
        <div className='reswap-post'>
            <img src={img} alt="Post"></img>
        </div>
        <div className='img-upload'>
        <label>Upload a Image:</label><br/>
            <input id = "upload-in" type="file" accept='image/*' onChange={(e)=>setUploadImg(e.target.files[0])} placeholder='upload a img' />
            {uploadImg &&
                <div className='preview-container'>
                    <img className='img-preview' src={URL.createObjectURL(uploadImg)} alt="post" />
                </div>
            }
        </div>
        <div className='whats-new'>
            <textarea type="text" placeholder="what's new?" rows="2" onChange={(e)=>setFeedText(e.target.value)} value={feedText}></textarea>
        </div>
        <div className='reswap-button'>
            <button disabled={uploadPart} onClick={()=>{reswapFunction(props.postId , props.postImg, props.postContent)}}>{uploadPart?"Reswapping...":"Reswap"}</button>
        </div>
    </>
  )
}

export default Reswap;