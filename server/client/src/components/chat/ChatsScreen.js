
import React from "react";
import { useState } from 'react';
import List from '@mui/material/List';
import ChatPreview from "./ChatPreview"
import Divider from '@mui/material/Divider';
import { getFromLocalStorage, addToLocalStorage } from "../../helpers/localStorage";
import trips from '../../trips.json'

const ChatScreen = () => {
    const [matchListIds, setIds] = useState(getFromLocalStorage('matchedTrips'))
    const [matchTrips, setTrips] = useState([...trips.trips].filter(t => matchListIds.includes(t.id)))

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
};

export default ChatScreen;