import { useState } from "react";
import { useNavigate } from "react-router-dom";
import trips from '../trips.json'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TripGallery from "./TripGallery";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import { getFromLocalStorage, addToLocalStorage } from "../helpers/localStorage";

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
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // const items = [
    //     'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600',
    //     'https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1600',
    //     'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1600'


    // ]

    const [tripToShow, setTrip] = useState([...trips.trips])
    const [wishlist, setWishList] = useState([])
    const [reject, setReject] = useState([])
    const [matchReq, setMatchReq] = useState([])
    const [imgIndex, setIndex] = useState(0)

    const scrollImg = (direction) => {
        let length = tripToShow[0].image.length
        console.log(length)
        console.log(imgIndex)
        if (direction == 'forward' && imgIndex < length - 1) {

            setIndex(imgIndex + 1)

        }
        if (direction == 'back' && imgIndex >= 1) {

            setIndex(imgIndex - 1)

        }
        if (direction == 'back' && imgIndex === 0) {

            setIndex(length - 1)


        }
        if (direction == 'forward' && imgIndex === length - 1) {

            setIndex(0)


        }

        console.log(imgIndex)

    }

    const tripEvaluate = () => {
        let newAr = [...tripToShow]
        newAr.shift()
        console.log(newAr)
        setTrip(newAr)
        setIndex(0)
    }

    const handleReject = () => {
        setReject([...reject, tripToShow[0].id])
        tripEvaluate()
        addToLocalStorage('rejectedTrips',reject )

    }

    const handleAddToWishList = () => {
        setWishList([...wishlist, tripToShow[0].id])
        tripEvaluate()
        addToLocalStorage('wishListTrips',wishlist )


    }

    const handleMatchReq = () => {
        //req logic
        setMatchReq([...matchReq, tripToShow[0].id])
        tripEvaluate()
        addToLocalStorage('matchedTrips',matchReq )
    }
    console.log(tripToShow)
    console.log(imgIndex)
    if (tripToShow.length<1) {
        return (
            <Typography>
                No new trips available at the moment.
                Come back later 
                Or Create your own trip
            </Typography>
        )
    } else {



        return (

            <Card>
                <CardContent sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'space-between',
                    height: '450px',
                    backgroundImage: `url(${tripToShow[0].image[imgIndex]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",

                }}

                >

                    <ArrowBackIosIcon onClick={() => { scrollImg('back') }} sx={{ marginTop: '50%' }} />

                    {/* <IconButton aria-label="back" onClick={()=>{scrollImg('forward')}}> */}
                    <ArrowForwardIosIcon onClick={() => { scrollImg('forward') }} sx={{ marginTop: '50%' }} />
                    {/* </IconButton> */}




                    <Box sx={{

                        position: "absolute",
                        bottom: "10px",
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: '2px 5px'

                    }}>
                        <Typography variant="body2" color="text.secondary" sx={{
                            color: "white",

                            fontSize: "18px",
                            fontWeight: "bold"
                        }}>
                            {tripToShow[0].location}


                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            color: "white",

                            fontSize: "16px",

                        }}>

                            {tripToShow[0].trip_title}


                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                            color: "white",

                            fontSize: "18px",

                        }}>

                            {tripToShow[0].date}

                        </Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            sx={{ width: 35, heigth: 35 }}
                        >
                            <InfoIcon sx={{ fontSize: 35, color: "white" }} />
                        </ExpandMore>
                    </Box>





                </CardContent>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Trip details:</Typography>
                        <Typography paragraph>
                            More details
                        </Typography>
                        <Typography paragraph>
                            {tripToShow[0].description}
                        </Typography>

                    </CardContent>
                </Collapse>
                <CardActions sx={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                    <IconButton aria-label="add to declined" onClick={() => { handleReject() }}>
                        <ClearIcon color='error' sx={{ fontSize: 35 }} />
                    </IconButton>
                    <IconButton aria-label="add to wishlist" onClick={() => { handleAddToWishList() }}>
                        <BookmarksIcon color='secondary' sx={{ fontSize: 35 }} />
                    </IconButton>
                    {/* <IconButton aria-label="new trip" onClick={
                        () => {
                            navigate('/newtrip')
                        }
                    }>
                        <AddCircleIcon color='secondary' sx={{ fontSize: 35 }} />
                    </IconButton> */}
                    <IconButton aria-label="add to intresting" onClick={() => { handleMatchReq() }}>
                        <FavoriteIcon color='success' sx={{ fontSize: 35 }} />
                    </IconButton>
                    



                </CardActions>
            </Card>
        );
    }
}


export default ImageCard