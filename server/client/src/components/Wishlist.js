import React from "react";
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import { getFromLocalStorage, addToLocalStorage } from "../helpers/localStorage";
// import trips from '../trips.json'
import { getDocs, collection, query, updateDoc, doc, getDoc, where } from "firebase/firestore";
import { auth, db } from '../config/firebase'
import {useTrips} from './useTrips.js'


const WishList = () => {

    //on click? open card with match/reject?
    // const [wishListIds, setIds] = useState([])
    // const [wishTrips, setTrips] = useState([])
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [wishListIds, setIds] = useState(getFromLocalStorage('wishListTrips'))
    // const [wishTrips, setTrips] = useState([...trips.trips].filter(t => wishListIds.includes(t.id)))

    // const trips = useTrips(user, 'wishlist')

    // const getMatchedIds = async () => {
    //     const userDocRef = doc(db, `users/${auth.currentUser.uid}`)
    //     try {
    //         const UserData = await getDoc(userDocRef)
    //         let wl = UserData.data().wishlist
    //         getTripsData(wl)
    //         setIds(wl)
    //     } catch (err) {
    //         console.error(`Error updating document:`, err);
    //     }


    // }

    // const getTripsData = async (data) => {
    //     try {
    //         const tripRef = collection(db, "trips")
    //         const specificTripsArray = [];
    //         for (const tripId of data) {
    //             const tripDocRef = doc(db, "trips", tripId);
    //             const tripDocSnapshot = await getDoc(tripDocRef);

    //             if (tripDocSnapshot.exists()) {
    //                 specificTripsArray.push({ id: tripDocSnapshot.id, ...tripDocSnapshot.data() });
    //             }
    //         }

    //         setTrips(specificTripsArray);
    //     }
    //     catch (error) {
    //         console.error('Error fetching specific trips:', error);
    //     }



    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const trips = useTrips(user, 'wishlist')

    // useEffect(() => {
    //     if (user && user.uid){
    //         getMatchedIds()
    //     }
        
    //     // if(matchListIds.length>1){
    //     //     getTripsData()
    //     // }

    // }, [user])


    return (


        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                trips.map(trip => {
                    return (
                        <ListItem>

                            <ListItemAvatar>
                                <Avatar src={trip.image[0]} />
                            </ListItemAvatar>

                            <ListItemText sx={{ display: 'flex' }}>
                                <Typography>{trip.trip_title}</Typography>
                                <Typography>{trip.location}</Typography>
                                <Typography>{trip.date}</Typography>
                            </ListItemText>

                        </ListItem>
                    )
                })
            }

        </List>
    )
};

export default WishList;