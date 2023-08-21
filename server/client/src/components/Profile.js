
import { useNavigate } from 'react-router-dom';
import WishList from "./Wishlist"
import { Box, Stack, Button } from '@mui/material'

const Profile = () => {
    const navigate = useNavigate()
    return (
        // <Box
        //     sx={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         // marginTop: '2em',
        //         // backgroundColor: 'rgba(0, 0, 0, 0.2)',
        //         // backgroundImage: "url(https://img.freepik.com/premium-photo/generative-ai-illustration-cool-trendy-collage-summer-beach-handmade-scrapbook-paper-with-vibrant-colors_58460-14279.jpg?w=740)",
        //         // backgroundPosition: 'center',
        //         // backgroundRepeat: 'no-repeat',
        //         // backgroundSize: 'cover',
        //     }}>
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



        // </Box>
    )
}


export default Profile