import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import WishList from "./Wishlist"

const Profile =() => {
    const navigate = useNavigate()
return (
    <>
    <Button ariant="outlined"
    onClick={()=>{navigate('/newtrip')}}
    >My settings</Button>
    
    <Button ariant="outlined"
    onClick={()=>{navigate('/newtrip')}}
    >Create New Trip</Button>
    </>
)
}


export default Profile