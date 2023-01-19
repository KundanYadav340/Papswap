
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import { getAuth } from "firebase/auth"; 
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAuGc9L0AJS1nZ55_NunaHL6Lkxrg7J8XY",
    authDomain: "papswap-test.firebaseapp.com",
    databaseURL: "https://papswap-test-default-rtdb.firebaseio.com",
    projectId: "papswap-test",
    storageBucket: "papswap-test.appspot.com",
    messagingSenderId: "635195213693",
    appId: "1:635195213693:web:aa96d1b354c0efc3fdee14",
    measurementId: "G-PY1QZCCN80"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);