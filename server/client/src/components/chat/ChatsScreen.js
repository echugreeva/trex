import React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import ChatPreview from './ChatPreview';
import { auth } from '../../config/firebase';
import {useTrips} from '../useTrips.js';

const ChatScreen = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	let navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const trips = useTrips(user, 'matched');

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return navigate('/');
	}

	return (
		<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
			{
				trips.map(trip => {
					return (
						<ChatPreview
							trip={trip}
							name={trip.trip_title}
							message={trip.location}
							timestamp="6 mins ago"
							profilePic={trip.image[0]}
							location={trip.location}
						/>
					);
				})
			}
		</List>
	);
};

export default ChatScreen;