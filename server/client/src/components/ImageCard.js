import { useState, useEffect } from "react";
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
import StarsSharpIcon from '@mui/icons-material/StarsSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import { getFromLocalStorage, addToLocalStorage } from "../helpers/localStorage";
import { getDocs, collection, query, updateDoc, doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from '../config/firebase'
import ErrorBoundary from "./ErrorBoundary";

import { useAuthState } from "react-firebase-hooks/auth";



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
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const fetchTrips = async () => {
        const querySnapshot = await getDocs(query(collection(db, "trips")));
        const myAr = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let obj = { id: doc.id, ...doc.data() }
            if (saved.indexOf(obj.id) == -1) {
                myAr.push(obj)
            }

        });
        setAll(myAr)
        fetchSaved()


    }

    const fetchSaved = async () => {
        const q = query(collection(db, 'users'));


        try {

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docu) => {
                if (docu.data().uid == auth.currentUser.uid) {
                    const userDocRef = doc(db, 'users', docu.id);
                    try {
                        const UserData = await getDoc(userDocRef)
                        let matched = UserData.data().matched
                        let rejects = UserData.data().reject;
                        let wishlist = UserData.data().wishlist;
                        console.log(rejects)
                        console.log(matched)
                        console.log(wishlist)
                        let saveAr = []
                        if (rejects) {
                            saveAr.push(...rejects)
                        }
                        if (matched) {
                            saveAr.push(...matched)
                        }
                        if (wishlist) {
                            saveAr.push(...wishlist)
                        }
                        console.log(saveAr)
                        let newTrip = [...allTrip]
                        newTrip.filter((trip)=>saveAr.indexOf(trip.id)==-1)
                        console.log(newTrip)
                        setTrip(newTrip)
                        setSaved(saveAr)


                    } catch (err) {
                        console.error(`Error updating document ${docu.id}:`, err);
                    }
                }
            }

            );
                } catch (err) {
            alert(err)
        }

    }

    // 
    const [tripToShow, setTrip] = useState([])
    const [allTrip, setAll] = useState([])
    // const [fbTrips, setFBTrips] = useState([...trips.trips])
    const [wishlist, setWishList] = useState([])
    const [reject, setReject] = useState([])
    const [saved, setSaved] = useState([])
    const [matchReq, setMatchReq] = useState([])
    const [imgIndex, setIndex] = useState(0)


    useEffect(() => {
        // console.log(auth.currentUser.uid)
        fetchTrips()
        // fetchSaved()

    }, [])
    
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
      }, [user, loading]);

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

    const handleReject = async () => {
        setReject([...reject, tripToShow[0].id])

        tripEvaluate()
        addToLocalStorage('rejectedTrips', reject)
        const q = query(collection(db, 'users'));


        try {

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docu) => {
                if (docu.data().uid == auth.currentUser.uid) {
                    const userDocRef = doc(db, 'users', docu.id);
                    try {
                        await updateDoc(userDocRef, {
                            reject: arrayUnion(tripToShow[0].id)
                        });
                        console.log(`Document ${docu.id} updated successfully.`);
                    } catch (err) {
                        console.error(`Error updating document ${docu.id}:`, err);
                    }
                }
            }
            );

        } catch (err) {
            alert(err)
        }

    }



    const handleAddToWishList = async () => {
        // setWishList([...wishlist, tripToShow[0].id])

        // addToLocalStorage('wishListTrips', wishlist)
        const q = query(collection(db, 'users'));


        try {

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docu) => {
                if (docu.data().uid == auth.currentUser.uid) {
                    const userDocRef = doc(db, 'users', docu.id);
                    try {
                        await updateDoc(userDocRef, {
                            wishlist: arrayUnion(tripToShow[0].id)
                        });
                        console.log(`Document ${docu.id} updated successfully.`);
                    } catch (err) {
                        console.error(`Error updating document ${docu.id}:`, err);
                    }
                }
            }
            );

        } catch (err) {
            alert(err)
        }

        tripEvaluate()

    }

    const handleMatchReq = async () => {
        //req logic
        // setMatchReq([...matchReq, tripToShow[0].id])

        // addToLocalStorage('matchedTrips', matchReq)
        const q = query(collection(db, 'users'));
        try {

            const { docs } = await getDocs(q);
            docs.forEach(async (docu) => {
                if (docu.data().uid == auth.currentUser.uid) {
                    const userDocRef = doc(db, 'users', docu.id);
                    try {
                        await updateDoc(userDocRef, {
                            matched: arrayUnion(tripToShow[0].id)
                        });
                        console.log(`Document ${docu.id} updated successfully.`);
                    } catch (err) {
                        console.error(`Error updating document ${docu.id}:`, err);
                    }
                }
            }
            );

        } catch (err) {
            alert(err)
        }
        tripEvaluate()
    }
    console.log(tripToShow)
    console.log(imgIndex)
    // let imgSrc = tripToShow[0].images[0]|| tripToShow[0].image[0]
    if (!tripToShow) {
        return (
            <Typography>
                Loading
            </Typography>
        )

    }
    if (tripToShow.length < 1) {
        return (
            <Typography>
                No new trips available at the moment.
                Come back later
                Or Create your own trip
            </Typography>
        )
    } else {



        return (

            <Card sx={{ height: '100%', overflowY: 'auto' }}>
                <CardContent sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'space-between',
                    height: '85%',
                    backgroundImage: `url(${tripToShow[0].image[imgIndex]})`,
                    // || `url(${tripToShow[0].images[0]})`,
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

                            {/* {tripToShow[0].date} */}

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
                            {tripToShow[0].description}
                        </Typography>

                    </CardContent>
                </Collapse>
                <CardActions sx={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                    <IconButton aria-label="add to declined" onClick={() => { handleReject() }}>
                        <ClearIcon color='error' sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton aria-label="add to wishlist" onClick={() => { handleAddToWishList() }}>
                        <StarsSharpIcon color='primary' sx={{ fontSize: 45 }} />
                    </IconButton>
                    {/* <IconButton aria-label="new trip" onClick={
                        () => {
                            navigate('/newtrip')
                        }
                    }>
                        <AddCircleIcon color='secondary' sx={{ fontSize: 35 }} />
                    </IconButton> */}
                    <IconButton aria-label="add to intresting" onClick={() => { handleMatchReq() }}>
                        <FavoriteIcon color='success' sx={{ fontSize: 40 }} />
                    </IconButton>




                </CardActions>
            </Card>
        );
    }
}


export default ImageCard