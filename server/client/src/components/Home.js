
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import ImageCard from './ImageCard';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import ErrorBoundary from './ErrorBoundary';

const Home = () => {
	const [user, loading, error] = useAuthState(auth);
	let navigate = useNavigate();

	useEffect(()=>{
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
			} else {
				return navigate('/');
				// User is signed out
			}
		});
	},[]); 
	return(
		<ErrorBoundary><ImageCard/></ErrorBoundary>
	);
};

export default Home;