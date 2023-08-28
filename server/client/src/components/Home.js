
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import ImageCard from './ImageCard';
import Container from '@mui/material/Container';
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../config/firebase';
import ErrorBoundary from "./ErrorBoundary";

const Home = () => {
    const [user, loading, error] = useAuthState(auth)
    let navigate = useNavigate();


     useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              // ...
            } else {
                return navigate("/");
              // User is signed out
              // ...
            }
          });
     },[]) 
    return(
        <ErrorBoundary><ImageCard/></ErrorBoundary>
    
        
    )
}

export default Home