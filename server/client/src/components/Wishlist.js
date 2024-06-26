import React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getDocs, collection, query, updateDoc, doc, getDoc, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import {useTrips} from './useTrips.js';

const WishList = () => {

	// on click? open card with match/reject?
  
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const trips = useTrips(user, 'wishlist');

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
					);
				})
			}
		</List>
	);
};

export default WishList;