import React from "react";
import { useState,useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';
import { getFromLocalStorage, addToLocalStorage } from "../helpers/localStorage";
import trips from '../trips.json'
import { getDocs, collection, query, updateDoc,doc , getDoc, where} from "firebase/firestore";
import { auth, db } from '../config/firebase'


const WishList = () => {

    //on click? open card with match/reject?
    const [wishListIds, setIds] = useState([])
    const [wishTrips, setTrips] = useState([])
    // const [wishListIds, setIds] = useState(getFromLocalStorage('wishListTrips'))
    // const [wishTrips, setTrips] = useState([...trips.trips].filter(t => wishListIds.includes(t.id)))

    const getMatchedIds = async()=> {
        const q = query(collection(db, 'users'));
    
               
                try {
    
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach(async (docu) => {
                        if (docu.data().uid == auth.currentUser.uid){
                            const userDocRef = doc(db, 'users', docu.id);
                            try {
                              const UserData = (await getDoc(userDocRef)).data().wishlist;
                              console.log(UserData);
                              setIds(UserData)
                              getTripsData(UserData)
                            } catch (err) {
                              console.error(`Error updating document ${docu.id}:`, err);
                            }
                          }
                        }
                    );
                
                  } catch (err) {
                    alert(err)
                  }

    }

    const getTripsData = async(data)=>{
        let myAr = []
        await data.map(async(id)=>{
            const tripRef = doc(db, "trips",id)
            const querySnapshot = (await getDoc(tripRef)).data()
            console.log(querySnapshot)
            setTrips([...wishTrips, querySnapshot])
           
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            //     let obj = { id: doc.id, ...doc.data() }
            //     myAr.push(obj)
        // });
        })
        
    }   

    

    useEffect(()=> {
        
        getMatchedIds()
        // if(matchListIds.length>1){
        //     getTripsData()
        // }
        
    },[])
    return (


        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                wishTrips.map(trip => {
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
                profilePic="https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1600" />
    <ListItem onClick={()=>{navigate(`/chats/${name}`)}}>
            
            <ListItemAvatar>
                <Avatar src={profilePic} />
            </ListItemAvatar>

            <ListItemText sx={{display: 'flex'}}>
                <Typography>{name}</Typography>
                <Typography>{message}</Typography>
                <Typography>{timestamp}</Typography>
            </ListItemText>

        </ListItem> */}

        </List>
    )
};

export default WishList;