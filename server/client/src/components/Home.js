
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import ImageCard from './ImageCard';
import Container from '@mui/material/Container';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../config/firebase';

const Home = () => {
    const [user, loading, error] = useAuthState(auth)
    let navigate = useNavigate();
    // useEffect(() => {
    //     let authToken = sessionStorage.getItem('Auth Token')

    //     if (authToken) {
    //         navigate('/home')
    //     }

    //     if (!authToken) {
    //         navigate('/login')
    //     }
    // }, [])
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
      }, [user, loading]);
    return(
    
        <ImageCard/>
    )
}

export default Home