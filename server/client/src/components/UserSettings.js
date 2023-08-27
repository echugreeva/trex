
import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where, getDoc, getDocs, doc, get } from "firebase/firestore"
import { auth, db } from '../config/firebase'
import { Typography, Box, Container } from '@mui/material'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from "./ErrorBoundary";



const UserSettings = () => {
    const [userData, setUserData] = useState({})
    let navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth)

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
        const userId = auth.currentUser.uid;
        console.log(auth.currentUser)
        getUserData()
    }, [])

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        getUserData()
    }, [user, loading]);

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography>Name: {userData.name}</Typography>
            <Typography>Email: {userData.name}</Typography>
            <Typography>Age: {userData.age}</Typography>
        </Container>
    )
}

export default UserSettings