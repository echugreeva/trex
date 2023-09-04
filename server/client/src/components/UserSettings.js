
import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, where, getDoc, getDocs, doc, get, updateDoc, Timestamp } from "firebase/firestore"
import { auth, db } from '../config/firebase'
import { Typography, Box, Container, Grid, TextField, Button } from '@mui/material'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom'
import ErrorBoundary from "./ErrorBoundary";
import { onAuthStateChanged } from "firebase/auth";





const UserSettings = () => {
    const [userData, setUserData] = useState({})
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
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
    const handleChange = (event) => {
        setUserData({
            ...userData, [event.target.name]: event.target.value,
        })
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user && user.id) {
            const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
            try {
                await updateDoc(userDocRef, {
                    ...formData,
                });
                console.log(`Document  updated successfully.`);
            } catch (err) {
                console.error(`Error updating document :`, err);
            }
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
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography>Here is your profile data, feel free to update it</Typography>
                    <TextField
                        value={userData.name}
                        // label="Name"
                        name="name"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        value={userData.age}
                        // label="Age"
                        name="age"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        value={userData.email}
                        //  label="Email"
                        name="email"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        value={userData.bio}
                        //  label="Email"
                        name="bio"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            handleSubmit(e)
                            navigate('/profile')

                        }}
                        sx={{ // Set minimum width
                            borderRadius: '20px',
                            
                        }}
                    >
                        Submit Changes
                    </Button>

                </Grid>
                {/* <Typography>Name: {userData.name}</Typography>
                <Typography>Email: {userData.name}</Typography>
                <Typography>Age: {userData.age}</Typography> */}
            </Grid>
        </Container>
    )
}

export default UserSettings