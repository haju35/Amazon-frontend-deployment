
import firebase from "firebase/compat/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkAAp04VYIq8Y7lUCcmx_DaPsfOHucU7k",
  authDomain: "clone-7fbfd.firebaseapp.com",
  projectId: "clone-7fbfd",
  storageBucket: "clone-7fbfd.appspot.com",
  messagingSenderId: "571938824624",
  appId: "1:571938824624:web:75d70d556b9761b9cbf675",
  measurementId: "G-7S35WFTV37"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = app.firestore()

