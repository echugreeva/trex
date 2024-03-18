import { useState, useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const useTrips = (user, listName) => {
	const [trips, setTrips] = useState([]);

	const getMatchedIds = async () => {
		const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
		try {
			const UserData = await getDoc(userDocRef);
			let idList = UserData.data()[listName];
			getTripsData(idList);
		} catch (err) {
			console.error('Error updating document:', err);
		}

	};

	const getTripsData = async (data) => {
		try {
			const tripRef = collection(db, 'trips');
			const specificTripsArray = [];
			for (const tripId of data) {
				const tripDocRef = doc(db, 'trips', tripId);
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
	};

	useEffect(() => {
		if (user && user.uid) {
			getMatchedIds();
		}

	}, [user]);

	return trips;

};
