import { createContext, useContext, useEffect,useState, useReducer } from "react";
import {collection, getDocs,getDoc, query,deleteDoc,doc,getCountFromServer, where,setDoc, addDoc,updateDoc,limit,orderBy,startAfter, collectionGroup, arrayRemove} from "firebase/firestore"; 
import { db ,storage} from '../api/config-firebase';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import {v4} from "uuid";
import reducer from '../Reducer/homeReducer';
import { useAppContext } from "./appContext";



const initialState = {
    isLoadingPostData : true,
    postData:[],
    isLoadingFilterData:false,
    filterCategory:"all",
    filterPost:[],
    getMoreData:false,
    lastDoc:null,
    lastFilterDoc:null,
    isDataEmpty:false,
    isFilterDataEmpty:false
}
const HomeContext = createContext();
const HomeProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const {currentUser,user} = useAppContext();
    const getPostData = async () =>{
        try{
            const userRef = collection(db, "Posts");
            const q =  query(userRef, orderBy("createdAt","desc"),limit(20));
            const snapshot = await getDocs(q);
            // const ids = snapshot.docs.map((doc)=>(doc.data().post_id));
            // console.log(ids);
            // const h1id = ids.slice(0, 10);
            // const h2id = ids.slice(10,20);
            // console.log("sliced",h1id);
            // console.log("sliced",h2id);
            // const userRef2 = collection(db,"users",user.uid,"flames");
            // const q2 = query(userRef2,where('postId', 'in', [...h1id]));
            // const snapshot2 =await getDocs(q2).then().catch((err)=>{console.log(err)});
            // const likedIds1 = snapshot2.docs.map((doc)=>(doc.data().postId));
            // var snapshot3 ={};
            // var likedIds =[...likedIds1];
            // if(ids.length>10){
            //     const q3 = query(userRef2,where('postId', 'in', [...h2id]));
            //     snapshot3 =await getDocs(q3).then().catch((err)=>{console.log(err)});
            //     console.log("snap3",snapshot3);
            //     const likedIds2 = snapshot3.docs.map((doc)=>(doc.data().postId));
            //     likedIds = [...likedIds1,...likedIds2];

            // }
            // console.log("snap2",snapshot2);
            var post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
            // for(var i=0;i<post.length;i++){
            //     const id = post[i].id;
            //     const liked = likedIds.includes(id);
            //     post[i] = {...post[i], flamed:liked};
            // }
            const last = snapshot.docs[snapshot.docs.length-1];
            console.log('post',snapshot);
            dispatch({type:"SET_POST_DATA", payload:post});
            dispatch({type:"SET_LAST_DOC",payload:last});
            if(snapshot.docs.length<20){
                console.log("all post", "finished")
                dispatch({type:"SET_EMPTY_DATA"});
            }
        }catch(error){
            dispatch({type:"ERROR_IN_FETCHING_POSTDATA"});
        }
    };
    useEffect(()=>{
        getPostData();
      },[user]);
    useEffect(()=>{
        filterPost(state.filterCategory);
    },[state.filterCategory]);
    useEffect(()=>{
        if(state.getMoreData){
        loadMoreData();
        }
        console.log('get more', state.getMoreData);
    },[state.getMoreData]);
    const filterPostData = async (category) =>{
        dispatch({type:"SET_CATEGORY", payload:category});
    }
    const getMore = async () =>{
        dispatch({type:"SET_MORE_DATA_LOADER"});
    }
    const filterPost = async (category) =>{
        dispatch({type:"SET_FILTER_LOADER"});
        if(category==="all"){
            try{
                dispatch({type:"FILTER_DATA",payload:state.postData})
            }catch(error){
                dispatch({type:"ERROR_IN_FETCHING_POSTDATA"});
            }
        }else{
        try{
             const userRef = collection(db, "Posts");
            const q =  query(userRef, orderBy("createdAt","desc"),where("category","==",category),limit(20));
            const snapshot = await getDocs(q);
            const ids = snapshot.docs.map((doc)=>(doc.data().post_id));
            console.log(ids);
            const h1id = ids.slice(0, 10);
            const h2id = ids.slice(10,20);
            console.log("sliced",h1id);
            console.log("sliced",h2id);
            const userRef2 = collection(db,"users",user.uid,"flames");
            const q2 = query(userRef2,where('postId', 'in', [...h1id]));
            const snapshot2 =await getDocs(q2).then().catch((err)=>{console.log(err)});
            const likedIds1 = snapshot2.docs.map((doc)=>(doc.data().postId));
            var snapshot3 ={};
            var likedIds =[...likedIds1];
            if(ids.length>10){
                const q3 = query(userRef2,where('postId', 'in', [...h2id]));
                snapshot3 =await getDocs(q3).then().catch((err)=>{console.log(err)});
                console.log("snap3",snapshot3);
                const likedIds2 = snapshot3.docs.map((doc)=>(doc.data().postId));
                likedIds = [...likedIds1,...likedIds2];

            }
            console.log("snap2",snapshot2);
            var post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
            for(var i=0;i<post.length;i++){
                const id = post[i].id;
                const liked = likedIds.includes(id);
                post[i] = {...post[i], flamed:liked};
            }
            const last = snapshot.docs[snapshot.docs.length-1];
            dispatch({type:"FILTER_DATA", payload:post});
            dispatch({type:"SET_LAST_FILTER_DOC",payload:last});
            if(snapshot.docs.length<20){
                console.log(" filter data","finished")
                dispatch({type:"SET_EMPTY_FILTER_DATA"});
            }
        }catch(error){
            dispatch({type:"ERROR_IN_FETCHING_POSTDATA"});
        }
    }
    };
    const loadMoreData = async () =>{
        dispatch({type:"SET_MORE_LOADER"});
        if(state.filterCategory==="all"){
            try{
                const userRef = collection(db, "Posts");
                const q =  query(userRef, orderBy("createdAt","desc"),startAfter(state.lastDoc),limit(20));
                const snapshot = await getDocs(q);
                const ids = snapshot.docs.map((doc)=>(doc.data().post_id));
            console.log(ids);
            const h1id = ids.slice(0, 10);
            const h2id = ids.slice(10,20);
            console.log("sliced",h1id);
            console.log("sliced",h2id);
            const userRef2 = collection(db,"users",user.uid,"flames");
            const q2 = query(userRef2,where('postId', 'in', [...h1id]));
            const snapshot2 =await getDocs(q2).then().catch((err)=>{console.log(err)});
            const likedIds1 = snapshot2.docs.map((doc)=>(doc.data().postId));
            var snapshot3 ={};
            var likedIds =[...likedIds1];
            if(ids.length>10){
                const q3 = query(userRef2,where('postId', 'in', [...h2id]));
                snapshot3 =await getDocs(q3).then().catch((err)=>{console.log(err)});
                console.log("snap3",snapshot3);
                const likedIds2 = snapshot3.docs.map((doc)=>(doc.data().postId));
                likedIds = [...likedIds1,...likedIds2];

            }
            console.log("snap2",snapshot2);
            var post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
            for(var i=0;i<post.length;i++){
                const id = post[i].id;
                const liked = likedIds.includes(id);
                post[i] = {...post[i], flamed:liked};
            }
                const last = snapshot.docs[snapshot.docs.length-1];
                var final = [...state.postData, ...post];
                dispatch({type:"SET_MORE_DATA", payload:final});
                dispatch({type:"SET_LAST_DOC",payload:last});
                if(snapshot.docs.length<20){
                    console.log("all post", "finished")
                    dispatch({type:"SET_EMPTY_DATA"});
                }
            }catch(error){
                dispatch({type:"ERROR_IN_FETCHING_POSTDATA"});
            }
        }else{
        try{
             const userRef = collection(db, "Posts");
            const q =  query(userRef, orderBy("createdAt","desc"),startAfter(state.lastFilterDoc),where("category","==",state.filterCategory),limit(20));
            const snapshot = await getDocs(q);
            const ids = snapshot.docs.map((doc)=>(doc.data().post_id));
            console.log(ids);
            const h1id = ids.slice(0, 10);
            const h2id = ids.slice(10,20);
            console.log("sliced",h1id);
            console.log("sliced",h2id);
            const userRef2 = collection(db,"users",user.uid,"flames");
            const q2 = query(userRef2,where('postId', 'in', [...h1id]));
            const snapshot2 =await getDocs(q2).then().catch((err)=>{console.log(err)});
            const likedIds1 = snapshot2.docs.map((doc)=>(doc.data().postId));
            var snapshot3 ={};
            var likedIds =[...likedIds1];
            if(ids.length>10){
                const q3 = query(userRef2,where('postId', 'in', [...h2id]));
                snapshot3 =await getDocs(q3).then().catch((err)=>{console.log(err)});
                console.log("snap3",snapshot3);
                const likedIds2 = snapshot3.docs.map((doc)=>(doc.data().postId));
                likedIds = [...likedIds1,...likedIds2];

            }
            console.log("snap2",snapshot2);
            var post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
            for(var i=0;i<post.length;i++){
                const id = post[i].id;
                const liked = likedIds.includes(id);
                post[i] = {...post[i], flamed:liked};
            }
            const last = snapshot.docs[snapshot.docs.length-1];
            var final = [...state.filterPost, ...post];
            dispatch({type:"SET_MORE_FILTER_DATA", payload:final});
            dispatch({type:"SET_LAST_FILTER_DOC",payload:last});
            if(snapshot.docs.length<20){
                console.log("all filter post", "finished")
                dispatch({type:"SET_EMPTY_FILTER_DATA"});
            }
        }catch(error){
            dispatch({type:"ERROR_IN_FETCHING_POST_DATA"});
        }
    }
    };
    const flameFunction = async (idOfPost,liked,flame,feed,imageUrl) =>{
        var flamei = liked?flame-1:flame+1;
        console.log(user.uid);
        const coll = collection(db, "users", user.uid, "flames");
        const query_ = query(coll, where('postId', '==', idOfPost));
        const shot = await getCountFromServer(query_);
        console.log('count: ', shot.data().count);
        var liked2 = true;
        if(shot.data().count === 1){
            liked2 = true;
        }else{
            liked2= false;
        }
        var post =[];
        for(var k=0; k<state.filterPost.length; k++){
            if(state.filterPost[k].post_id === idOfPost){
                post.push({...state.filterPost[k], flames:flamei , flamed:!liked2});
            }else{
                post.push({...state.filterPost[k]});
            }
        }
        dispatch({type:"FLAME_FUNCTION",payload:post});
        post =[];
        for( k=0; k<state.postData.length; k++){
            if(state.postData[k].post_id === idOfPost){
                post.push({...state.postData[k], flames:flamei , flamed:!liked2});
            }else{
                post.push({...state.postData[k]});
            }
        }
        dispatch({type:"FLAME_FUNCTION_IN_ALL",payload:post});
        if(liked2){
            flamei = flame-1;
            console.log(idOfPost);
            const userRef = doc(db, "users",user.uid,"flames",idOfPost);
            await deleteDoc(userRef).then(()=>
                {
                const userRef = doc(db, "Posts",idOfPost);

                        updateDoc(userRef, {
                        flames: (flame-1)
                        }).then(()=>{}).catch((err)=>{console.log(err)})

                }
            ).catch((err)=>{console.log("err")})
        }else{
            flamei = flame+1;
            const userRef = doc(db,"users",user.uid,"flames",idOfPost);
            await setDoc (userRef,{
                flamedAt:new Date(),
                postId:idOfPost,
                postImg:imageUrl,
                feedText:feed
            }).then(()=>{
                const userRef = doc(db, "Posts",idOfPost);
                 updateDoc(userRef, {
                    flames: (flame+1)
                    }).then(()=>{}).catch((err)=>{console.log(err)})
                }
            ).catch((err)=>{console.log(err)})
        }
    }
    const reswapFunction = (postId, postImg, feedContent, uploadImg, feedText) =>{
        console.log("reswapping");
        const storageRef = ref(storage, `reswapedImg/${v4()}`);
        uploadBytes(storageRef, uploadImg).then((snapshot)=>{
            console.log(snapshot);
        }).catch((err)=>{console.log("reswap img upload" , err)});
    }
    useEffect(()=>{
        console.log('lastDoc',state.lastDoc);
    },[state.lastDoc]);
    useEffect(()=>{
        console.log('isData empty',state.isFilterDataEmpty);
    },[state.isFilterDataEmpty]);
return <HomeContext.Provider value={{...state, filterPostData, getPostData, getMore, flameFunction,reswapFunction}}>{children}</HomeContext.Provider>
};
//custom hooks

const useHomeContext = () =>{
 return useContext(HomeContext);
};
export {HomeProvider, HomeContext, useHomeContext};