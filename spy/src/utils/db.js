import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDbRZxga8aHjPAeKDasy8Qd1Tc0_DbGmAU",
    authDomain: "emxhive-spy.firebaseapp.com",
    databaseURL: "https://emxhive-spy-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "emxhive-spy",
    storageBucket: "emxhive-spy.appspot.com",
    messagingSenderId: "1047477990705",
    appId: "1:1047477990705:web:39e0ecbfe6cbee47e46c10",
    measurementId: "G-4WXPPJ2617"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const spyStore= getFirestore(app);
export const spyStorage = getStorage(app);
