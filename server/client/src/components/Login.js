import { useState } from 'react';
import {
	Container,
	Typography,
	Button,
	TextField

} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState('');
	const [user, loading, error] = useAuthState(auth);

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 8 }}>
			<TextField
				label="Email"
				name="email"
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				type="password"
				label="Password"
				name="password"
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<Button
				variant='contained'
				onClick={() => {
					logInWithEmailAndPassword(formData.email, formData.password);
					//add condition not to redirect
					if (auth) {
						navigate('/home');
					}
				}}
				sx={{ borderRadius: '20px'}}
			>Login</Button>
			<Typography sx={{ marginTop: '2em' }}>
                Don't have an account? <Link to="/register">Register</Link> now.
			</Typography>
		</Container >
	);
};

export default Login;