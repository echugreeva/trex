import { useState } from 'react';
import {
	Container,
	Button,
	TextField
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import { auth, registerWithEmailAndPassword } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const LoginReg = () => {
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
					registerWithEmailAndPassword(formData.email, formData.password);
					navigate('/onboarding');
				}}
				sx={{ // Set minimum width
					borderRadius: '20px',
				}}
			>Register</Button>         
			<div>
                Already have an account? <Link to="/">Login</Link> now.
			</div>
		</Container >
	);
};

export default LoginReg;