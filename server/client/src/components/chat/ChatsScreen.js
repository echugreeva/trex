
import React from "react";
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom'
import ChatPreview from "./ChatPreview"
import { getFromLocalStorage, addToLocalStorage } from "../../helpers/localStorage";
import trips from '../../trips.json'
import { getDocs, collection, query, updateDoc, doc, getDoc, where } from "firebase/firestore";
import { auth, db } from '../../config/firebase'

const ChatScreen = () => {
    const [matchListIds, setIds] = useState([])
    const [matchTrips, setTrips] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [user, loading, error] = useAuthState(auth)
    let navigate = useNavigate();

    const getMatchedIds = async () => {
        const userDocRef = doc(db, `users/${auth.currentUser.uid}`)
        try {

            const UserData = await getDoc(userDocRef)
            let match = UserData.data().matched
            getTripsData(match)
            setIds(match)
        } catch (err) {
            console.error(`Error updating document:`, err);
        }

    }

    const getTripsData = async (data) => {
        try {
            const tripRef = collection(db, "trips")
            const specificTripsArray = [];
            for (const tripId of data) {
                const tripDocRef = doc(db, "trips", tripId);
                const tripDocSnapshot = await getDoc(tripDocRef);

                if (tripDocSnapshot.exists()) {
                    specificTripsArray.push({ id: tripDocSnapshot.id, ...tripDocSnapshot.data() });
                }
            }

            setTrips(specificTripsArray);
        }
        catch (error) {
            console.error('Error fetching specific trips:', error);
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
        if (user && user.uid) { getMatchedIds() }

    }, [user])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return navigate("/");
    }


    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                matchTrips.map(trip => {
                    return (
                        <ChatPreview
                            trip={trip}
                            name={trip.trip_title}
                            message={trip.location}
                            timestamp="6 mins ago"
                            profilePic={trip.image[0]}
                            location={trip.location}

                        />

                    )
                })
            }
        </List>
    )
}

export default ChatScreen;