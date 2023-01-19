import { createContext, useContext, useEffect,useState, useReducer } from "react";
import {collection, getDocs,getDoc,doc, query, where,updateDoc, getCountFromServer, addDoc,set,limit,orderBy,setDoc, collectionGroup, deleteDoc} from "firebase/firestore"; 
import { createUserWithEmailAndPassword,updatePassword, deleteUser ,onAuthStateChanged, signOut, updateProfile,signInWithEmailAndPassword,sendEmailVerification} from "firebase/auth";
import { db, auth } from '../api/config-firebase';
import reducer from '../Reducer/appReducer';
import { FirebaseError } from "firebase/app";




const userMail = "kundan.yadav.5602@gmail.com";
const initialState = {
    isLoggedIn : false,
    userData:{}
}
const AppContext = createContext();
const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser ] = useState({});
    const [verification, setVerification] = useState(false);
    const [signInError, setSignInError] = useState("");
    const [signUpError, setSignUpError] = useState("");
    const [verifiedUser, setVerifiedUser] = useState(false);
    const [emailLater,setEmailLater] = useState("");
    const [passLater, setPassLater] = useState("");
    const [error3, setError3] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const getUserData = async (mail) =>{
        try{
        const userRef = collection(db, "users");
        const q =  query(userRef, where("userEmail","==",mail));
        const snapshot = await getDocs(q);
        const user = (snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
        console.log("userData",user);
        dispatch({type:"SET_USER_DATA", payload:user[0]});
        }catch(error){
            dispatch({type:"ERROR_IN_FETCHING_USERDATA"});
        }
    };
    useEffect(()=>{
       const unsubscribe =  onAuthStateChanged(auth, async (currentUser)=>{
            console.log("hhhhh",currentUser);
            setUser(currentUser);
            if(currentUser != null){
                setVerifiedUser(currentUser.emailVerified);
                console.log("is verified",verifiedUser);
                console.log("inside current user");
            if(currentUser.emailVerified){
                console.log("inside email verified");
                setVerification(true);
                const coll = collection(db, "users");
                const mailu = currentUser.email;
                const query_ = query(coll, where('userEmail', '==', mailu));
                await getCountFromServer(query_).then((shot)=>{
                    console.log("is exist", shot.data().count);
                    if(shot.data().count===0){
                        const coll = collection(db, "unverifiedUsers");
                        const q_ = query(coll, where('email', '==', currentUser.email));
                        getDocs(q_).then(async (snapshot)=>{
                            const post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
                            console.log("data in unverified users", post)
                            await insertUserInfoIntoDatabse(post[0].name, currentUser.email, currentUser.uid, new Date());
                            const coll = doc(db, "unverifiedUsers", post[0].id);
                            await deleteDoc(coll).then().catch((err)=>console.log(err));
                        
                        }).catch((err)=>console.log(err));
                    }
                }).catch((err)=>{console.log(err)})
            // setVerification(true);
            }
            }else{
                setVerification(false);
                console.log("email not verified");
            }
        });
        return ()=>{
            unsubscribe();
        }
    },[]);
    useEffect(()=>{
        getUserData(userMail);
    },[]);
    const signup =  (email, password, usern) =>{
        setShowLoader(true);
        console.log("creating account");
        setSignUpError("");
        setSignInError("");
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        setEmailLater(email);
        setPassLater(password);
        updateProfile(auth.currentUser, {
            displayName: usern
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          });
        sendEmailToVerify();
        const user = userCredential.user;
        const id = user.uid;
        console.log(id);
        const time = user.metadata.createdAt;
        console.log(time);
        console.log("user", user);
        const mail = user.email;
        const user2 = usern;
        //inserting user info in database
        if(insertInUnverifiedUser(usern,mail, id,password)){
            console.log("success" ,"userCreated in unverified user");
        }
        // ...
        })
        .catch(async (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if(errorMessage=="Firebase: Error (auth/email-already-in-use)."){
                
                // setSignUpError("User Email already exist");
                const ref = collection(db, "unverifiedUsers");
                const q = query(ref, where("email", "==", email));
                const snap = await getDocs(q);
                console.log("test", snap.size);
                if(snap.size === 1){
                    const post = snap.docs.map((doc)=>({...doc.data(), id:doc.id}));
                    console.log("test2", post);
                    signInWithEmailAndPassword(auth, post[0].email, post[0].password).then((snapshot)=>{
                        console.log("signed user",snapshot.user.emailVerified);
                        if(!snapshot.user.emailVerified){
                            updatePassword(auth.currentUser, password);
                            const userRef = doc(db, "unverifiedUsers",auth.currentUser.uid);
                            updateDoc(userRef, {
                            password:password
                            }).then(()=>{}).catch((err)=>{console.log(err)});
                            sendEmailToVerify();
                        }else{
                            signOut(auth);
                            setSignInError("email already exist please login Now");
                            setVerification(false);
                            setUser({});
                        }
                    })
                }else{
                    setSignUpError("email already exist please login Now");
                }
            }
            // ..
         });
         setShowLoader(false);
    }
    const insertInUnverifiedUser = async (name, mail, id, password) =>{
        const ref = doc(db,"unverifiedUsers",id);
            setDoc(ref,{
            name: name,
            email: mail,
            password:password
        },
        {merge:true})
    }
    const insertUserInfoIntoDatabse = async(usern,mail, id,time) =>{
            const ref = doc(db,"users",id);
            setDoc(ref,{
            userName: usern,
            userEmail: mail,
            coinVal:0,
            dailyrewardTimestamp:time,
            dateJoined:time,
            weeklyrewardTimestamp:time,
            userBio:"",
            userGender:"",
            userImage:"https://lh3.googleusercontent.com/a-/AOh14Gh8YAyD7EJOWhnhNFdTOl0SeO86sTA4F8FicUsmrrw=s96-c",
            userType:"viewer",
            userWebsite:"",
            user_id:id,
            superCoinVal:0,
            superCoins:[]
        },
        {merge:true}).then(()=>{
            return true;
            //save user in local database
        }).catch( async (err)=>{
            console.log(err);
            return false;
        });
         
    };
    const login = (email, password) =>{
        console.log("loggin in");
        setSignInError("");
        setSignUpError("");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(verification){
            // const coll = collection(db, "users");
            // const query_ = query(coll, where('userEmail', '==', email));
            // getCountFromServer(query_).then((shot)=>{
            //     console.log("is exist", shot.doc().count);
            //     if(shot.data().count===0){
            //         const coll = collection(db, "unverifiedUsers");
            //         const q_ = query(coll, where('email', '==', email));
            //         getDocs(q_).then(async (snapshot)=>{
            //             const post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
            //             console.log("post", post)
            //             await insertUserInfoIntoDatabse(post[0].name, post[0].email, user.uid, new Date());
            //             const coll = doc(db, "unverifiedUsers", post[0].id);
            //             await deleteDoc(coll).then().catch((err)=>console.log(err));
                        
            //         }).catch((err)=>console.log(err));
            //     }
            // })
        }
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if(errorMessage=="Firebase: Error (auth/user-not-found)."){
            setSignInError("User not found");
        }else if(errorMessage=="Firebase: Error (auth/wrong-password)."){
            setSignInError("User Password is Incorrect");
        }else{
            setSignInError("An unknown Error Occurred");
        }
    });
    }
    const sendEmailToVerify = () =>{
        console.log("sending mail");
        sendEmailVerification(auth.currentUser)
            .then(() => {
                 // Email verification sent!
                console.log("email sent");
                });
    }
    const verifiedLoginNow =async () =>{
        await auth.currentUser.reload();
        console.log("now updated", auth.currentUser);
        if(auth.currentUser.emailVerified===true){
            setVerification(true);
            console.log("inside email verified");
            setVerification(true);
                const coll = collection(db, "users");
                const mailu = auth.currentUser.email;
                const query_ = query(coll, where('userEmail', '==', mailu));
                await getCountFromServer(query_).then((shot)=>{
                    console.log("is exist", shot.data().count);
                    if(shot.data().count===0){
                        const coll = collection(db, "unverifiedUsers");
                        const q_ = query(coll, where('email', '==', auth.currentUser.email));
                        getDocs(q_).then(async (snapshot)=>{
                            const post = snapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
                            console.log("data in unverified users", post)
                            await insertUserInfoIntoDatabse(post[0].name, auth.currentUser.email, auth.currentUser.uid, new Date());
                            const coll = doc(db, "unverifiedUsers", post[0].id);
                            await deleteDoc(coll).then().catch((err)=>console.log(err));
                        
                        }).catch((err)=>console.log(err));
                    }
                }).catch((err)=>{console.log(err)});
                setError3("");
        }else{
            setError3("Your Email is not Verified yet.");
        }
    }
    const logout = () =>{
        setSignInError("");
        setSignUpError("");
        console.log("logging out");
        signOut(auth).then(() => {
        // Sign-out successful.
        setVerification(false);
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
        console.log('verified status',verification);
    },[verification])
return <AppContext.Provider value={{...state,signup,user,logout,login,verification,showLoader,sendEmailToVerify,signInError,signUpError,verifiedLoginNow,error3}}>{children}</AppContext.Provider>
};
//custom hooks

const useAppContext = () =>{
 return useContext(AppContext);
};
export {AppProvider, AppContext, useAppContext};