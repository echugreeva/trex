
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import ImageCard from './ImageCard';
import Container from '@mui/material/Container';



const Home = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])
    
    return(
    
        <ImageCard/>
    )
}

export default Home