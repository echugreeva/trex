
import React from "react";
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ChatPreview from "./ChatPreview"
import Divider from '@mui/material/Divider';
import { getFromLocalStorage, addToLocalStorage } from "../../helpers/localStorage";
import trips from '../../trips.json'
import { getDocs, collection, query, updateDoc, doc, getDoc, where } from "firebase/firestore";
import { auth, db } from '../../config/firebase'

const ChatScreen = () => {
    const [matchListIds, setIds] = useState([])
    const [matchTrips, setTrips] = useState([])


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

        // const q = query(collection(db, 'users'));


        //         try {

        //             const { docs } = await getDocs(q);
        //             docs.forEach(async (docu) => {
        //                 if (docu.data().uid == auth.currentUser.uid){
        //                     const userDocRef = doc(db, 'users', docu.id);
        //                     try {

        //                       const UserData = await getDoc(userDocRef)
        //                       let match =  UserData.data().matched
        //                       getTripsData(match)
        //                       setIds(match)
        //                     } catch (err) {
        //                       console.error(`Error updating document ${docu.id}:`, err);
        //                     }
        //                   }
        //                 }

        //             );

        //                       console.log(matchListIds)
        //                       getTripsData(matchListIds)

        //           } catch (err) {
        //             alert(err)
        //           }

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

        getMatchedIds()
        // if(matchListIds.length>1){
        //     getTripsData()
        // }

    }, [])


    // useEffect(()=> {
    //     getTripsData()

    // },[matchListIds])

    // if(matchTrips.length>1){
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
            {/* <ChatPreview
                    name="Jason"
                    message="Hej"
                    timestamp="6 mins ago"
                    profilePic="https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=800"
                />
                <Divider variant="inset" component="li" />
                <ChatPreview
                    name="Beach vacay summer 2023"
                    message="you got invited"
                    timestamp="1 hr ago"
                    profilePic="https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1600" /> */}
        </List>
    )
}

// };

export default ChatScreen;