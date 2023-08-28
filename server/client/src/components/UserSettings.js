
import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where, getDoc, getDocs, doc, get } from "firebase/firestore"
import { auth, db } from '../config/firebase'
import { Typography, Box, Container } from '@mui/material'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from "./ErrorBoundary";
import { onAuthStateChanged } from "firebase/auth";


const UserSettings = () => {
    const [userData, setUserData] = useState({})
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    // const [user, loading, error] = useAuthState(auth)

    const getUserData = async () => {
        const userDocRef = doc(db, `users/${auth.currentUser.uid}`)
        try {
            let data = await getDoc(userDocRef)
            let dbData = data.data()
            setUserData(dbData)
        } catch (err) {
            console.error(`Error updating document:`, err);

        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])


    useEffect(() => {
        if (user && user.uid) { 
            
            getUserData()
        }

    }, [user])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return navigate("/");
    }


    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography>Name: {userData.name}</Typography>
            <Typography>Email: {userData.name}</Typography>
            <Typography>Age: {userData.age}</Typography>
        </Container>
    )
}

export default UserSettings