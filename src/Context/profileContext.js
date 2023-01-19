import { createContext, useContext, useEffect,useState, useReducer } from "react";
import {collection, getDocs,getDoc,doc, query, where, addDoc,set,limit,orderBy,setDoc, collectionGroup} from "firebase/firestore"; 
import { createUserWithEmailAndPassword, deleteUser ,onAuthStateChanged,sendPasswordResetEmail, signOut, updateProfile,signInWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import { db, auth } from '../api/config-firebase';
import { useAppContext } from "./appContext";
const ProfileContext = createContext();

const ProfileProvider = ({children}) =>{
    const {user} = useAppContext();
    const [reswapedData, setReswapedData]=useState([]);
    const [flamedData, setFlamedData]=useState([]);
    // const getUserData = async (mail) =>{
    //     try{
    //     const userRef = collection(db, "users");
    //     const q =  query(userRef, where("userEmail","==",mail));
    //     const snapshot = await getDocs(q);
    //     const user = (snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
    //     }catch{

    //     }
    // };
    const getUserReswapData = async () =>{
        try{
            const uid = user.uid;
            const userRef = collection(db,"users", uid,"reswaps");
            const q = query(userRef,orderBy("reswapedAt", "desc"),limit(30));
            const snapshot = await getDocs(q);
            // const ids = snapshot.docs.map((doc)=>(doc.data().postId));
            // setReswapedData(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
            // console.log(reswapedData);
            // console.log(ids);
            // const userRef2 = collection(db,"Posts");
            // const q2 = query(userRef2,where('post_id', 'in', [...ids]));
            // const snapshot2 = await getDocs(q2);
            setReswapedData(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }catch(err){
            console.log(err);
        }
    }
    const getUserFlamedData = async () =>{
        try{
            const uid = user.uid;
            const userRef = collection(db,"users", uid,"flames");
            const q = query(userRef,orderBy("flamedAt", "desc"),limit(30));
            const snapshot = await getDocs(q);
            // const ids = snapshot.docs.map((doc)=>(doc.data().postId));
            // setReswapedData(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
            // console.log(reswapedData);
            // console.log(ids);
            // const userRef2 = collection(db,"Posts");
            // const q2 = query(userRef2,where('post_id', 'in', [...ids]));
            // const snapshot2 = await getDocs(q2);
            setFlamedData(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }catch(err){
            console.log(err);
        }
    }
    const resetPassword = async () =>{
        try{
            await sendPasswordResetEmail(auth, user.email);
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("reset password error", errorMessage);
            // ..
        }
    }
return <ProfileContext.Provider value={{getUserReswapData,reswapedData,flamedData,resetPassword,getUserFlamedData}}>{children}</ProfileContext.Provider>
};
//custom hooks

const useProfileContext = () =>{
 return useContext(ProfileContext);
};
export {ProfileProvider, ProfileContext, useProfileContext};