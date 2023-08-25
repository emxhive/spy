import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";

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
const spyStore = getFirestore(app);
const spyStorage = getStorage(app);
const spyAuth = getAuth(app);
const provider = new GoogleAuthProvider();
const authState = onAuthStateChanged;


export { spyStorage, spyStore, spyAuth, provider, authState };