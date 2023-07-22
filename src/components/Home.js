import Header from './Header'
import Footer from './Footer'
import ImageCard from './ImageCard';
import Container from '@mui/material/Container';

const Home = () => {
    return(
        <Container maxWidth="sm">
            <Header/>
            <ImageCard/>
            {/* <Footer/> */}

        </Container>
    )
}

export default Home