
import { useNavigate } from 'react-router-dom';
import WishList from "./Wishlist"
import { Box, Stack, Button } from '@mui/material'

const Profile = () => {
    const navigate = useNavigate()
    return (

            <Stack spacing={2} direction="column" alignItems="center"
                justifyContent="center" p={2}  >
                <Button variant="outlined" size="large" color='secondary'
                    sx={{
                        minWidth: '40%', // Set minimum width
                        borderRadius: '20px',
                    }}
                    onClick={() => { navigate('/settings') }}
                >My settings</Button>
                <Button variant="contained"
                    sx={{
                        minWidth: '40%', // Set minimum width
                        borderRadius: '20px',
                    }}
                    onClick={() => { navigate('/newtrip') }}
                >Create New Trip</Button>
            </Stack>

    )
}


export default Profile