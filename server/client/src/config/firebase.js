// Import the functions you need from the SDKs you need
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {

  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc, setDoc, doc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    
    sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
    
  } catch (err) {
    
    console.error(err);
    alert(err.message);

  }
}

// const registerWithEmailAndPassword = async (email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     console.log(user)
//     await setDoc(db, "users", {
//       uid: user.uid,
//       email,
//       authProvider: "local",
//       // password: formData.password

//     });
    const registerWithEmailAndPassword = async (email, password) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log(user)
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          
          email,
          authProvider: "local",
         
    
        });

   
    sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken)
    sessionStorage.setItem('uid', res.user.uid)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,

  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};