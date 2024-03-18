import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoIcon from '@mui/icons-material/Info';
import { addToLocalStorage } from '../helpers/localStorage';
import { getDocs, collection, query, updateDoc, doc, getDoc, arrayUnion,onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const ImageCard = () => {

	const navigate = useNavigate();
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const fetchTrips = async () => {
		const querySnapshot = await getDocs(query(collection(db, 'trips')));
		const myAr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
			let obj = { id: doc.id, ...doc.data() };
			if (saved.indexOf(obj.id) == -1) {
				myAr.push(obj);
			}
		});
		setTrip(myAr);
	};

	const fetchSaved = async () => {
		const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
		try {
			const UserData = await getDoc(userDocRef);
			let matched = UserData.data().matched;
			let rejects = UserData.data().reject;
			let wishlist = UserData.data().wishlist;
			console.log(rejects);
			console.log(matched);
			console.log(wishlist);
			let saveAr = [];
			if (rejects) {
				saveAr.push(...rejects);
			}
			if (matched) {
				saveAr.push(...matched);
			}
			if (wishlist) {
				saveAr.push(...wishlist);
			}
			console.log(saveAr);
			let newTrip = [...allTrip];
			console.log('before filter' + newTrip);
			newTrip.filter((trip) => saveAr.indexOf(trip.id) == -1);
			console.log('after filter' + newTrip);
			setTrip(newTrip);
			setSaved(saveAr);

		} catch (err) {
			console.error('Error updating document:', err);
		}
	};

	const [tripToShow, setTrip] = useState([]);
	const [allTrip, setAll] = useState([]);
	const [wishlist, setWishList] = useState([]);
	const [reject, setReject] = useState([]);
	const [saved, setSaved] = useState([]);
	const [matchReq, setMatchReq] = useState([]);
	const [imgIndex, setIndex] = useState(0);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const scrollImg = (direction) => {
		let length = tripToShow[0].image.length;

		console.log(length);
		console.log(imgIndex);
		if (direction == 'forward' && imgIndex < length - 1) {

			setIndex(imgIndex + 1);

		}
		if (direction == 'back' && imgIndex >= 1) {

			setIndex(imgIndex - 1);

		}
		if (direction == 'back' && imgIndex === 0) {

			setIndex(length - 1);

		}
		if (direction == 'forward' && imgIndex === length - 1) {

			setIndex(0);

		}

		console.log(imgIndex);

	};

	const tripEvaluate = () => {
		let newAr = [...tripToShow];
		newAr.shift();
		console.log(newAr);
		setTrip(newAr);
		setIndex(0);
	};

	const handleReject = async () => {
		setReject([...reject, tripToShow[0].id]);
		tripEvaluate();
		addToLocalStorage('rejectedTrips', reject);
		const q = query(collection(db, 'users'));
		const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
		try {
			await updateDoc(userDocRef, {
				reject: arrayUnion(tripToShow[0].id)
			});
			console.log('Document  updated successfully.');
		} catch (err) {
			console.error('Error updating document:', err);
		}
		tripEvaluate();
	};

	const handleAddToWishList = async () => {

		const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
		try {
			await updateDoc(userDocRef, {
				wishlist: arrayUnion(tripToShow[0].id)
			});
			console.log('Document  updated successfully.');
		} catch (err) {
			console.error('Error updating document:', err);
		}
		tripEvaluate();

	};

	const handleMatchReq = async () => {
		//req logic
		// setMatchReq([...matchReq, tripToShow[0].id])
		// addToLocalStorage('matchedTrips', matchReq)
		const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
		try {
			await updateDoc(userDocRef, {
				matched: arrayUnion(tripToShow[0].id)
			});
			console.log('Document  updated successfully.');
		} catch (err) {
			console.error('Error updating document:', err);
		}
		tripEvaluate();
	};
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (user && user.uid){
			fetchSaved();
		}
        
	}, [user]);

	useEffect(() => {
		if (user && user.uid) {
			onSnapshot(collection(db, 'trips'), (querySnapshot) => {
				const myAr = [];
				querySnapshot.forEach((doc) => {
					let obj = { id: doc.id, ...doc.data()};
					if (saved.indexOf(obj.id) == -1) {
						myAr.push(obj);
					}
				});
				setTrip(myAr);
			});
		}
	}
	,[saved]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!user) {
		return navigate('/');
	}

	if (tripToShow.length < 1) {
		return (
			<Typography>
                No new trips available at the moment.
                Come back later
                Or Create your own trip
			</Typography>
		);
	} else {

		return (

			<Card sx={{ height: '100%', overflowY: 'auto', borderRadius: '0' }}>
				<CardContent sx={{
					display: 'flex',
					position: 'relative',
					justifyContent: 'space-between',
					height: '85%',
					backgroundImage: `url(${tripToShow[0].image[imgIndex]})`,
					// || `url(${tripToShow[0].images[0]})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
				>
					<ArrowBackIosIcon onClick={() => { scrollImg('back'); }} sx={{ marginTop: '50%' }} />
					{/* <IconButton aria-label="back" onClick={()=>{scrollImg('forward')}}> */}
					<ArrowForwardIosIcon onClick={() => { scrollImg('forward'); }} sx={{ marginTop: '50%' }} />
					{/* </IconButton> */}
					<Box sx={{
						position: 'absolute',
						bottom: '10px',
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
						padding: '2px 5px'
					}}>
						<Typography variant="body2" color="text.secondary" sx={{
							color: 'white',
							fontSize: '18px',
							fontWeight: 'bold'
						}}>
							{tripToShow[0].location}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{
							color: 'white',
							fontSize: '16px',
						}}>
							{tripToShow[0].trip_title}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{
							color: 'white',
							fontSize: '18px',
						}}>
						</Typography>
						<ExpandMore
							expand={expanded}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
							sx={{ width: 35, heigth: 35 }}
						>
							<InfoIcon sx={{ fontSize: 35, color: 'white' }} />
						</ExpandMore>
					</Box>
				</CardContent>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Trip details:</Typography>
						<Typography paragraph>
							{tripToShow[0].description}
						</Typography>
					</CardContent>
				</Collapse>
				<CardActions sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
					<IconButton aria-label="add to declined" onClick={() => { handleReject(); }}>
						<ClearIcon color='error' sx={{ fontSize: 40 }} />
					</IconButton>
					<IconButton aria-label="add to wishlist" onClick={() => { handleAddToWishList(); }}>
						<StarsSharpIcon color='primary' sx={{ fontSize: 45 }} />
					</IconButton>
					<IconButton aria-label="add to intresting" onClick={() => { handleMatchReq(); }}>
						<FavoriteIcon color='success' sx={{ fontSize: 40 }} />
					</IconButton>
				</CardActions>
			</Card>
		);
	}
};

export default ImageCard;