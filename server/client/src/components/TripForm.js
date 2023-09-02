import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, updateDoc, doc, arrayUnion } from "firebase/firestore";
import dayjs from 'dayjs';
import {
    Container,
    Grid,
    Typography,
    Button,
    TextField,
    MobileStepper,
    Step,
    StepLabel,
    Checkbox,
    Chip,
    Select,
    MenuItem,


} from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getFromLocalStorage, addToLocalStorage } from "../helpers/localStorage";
import { auth, db } from '../config/firebase'



const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const hobbies = ['Adventure', 'Hiking', 'Beach', 'Mountains', 'Forest', 'City', 'Nature', 'History', 'Art', 'Music', 'Food', 'Nightlife', 'Backpacking', 'Culture', 'Luxury', 'Yoga', 'Wine', 'Meditation'
]
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];
//in the future get all input fields and step in props and generate form as a function



const TripForm = () => {

    // const lastId = getFromLocalStorage('matchedTrips').pop()[id]
    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({ image: ['https://images.pexels.com/photos/2405101/pexels-photo-2405101.jpeg?auto=compress&cs=tinysrgb&w=800'] });
    const [selectedCountry, setSelectedCountry] = useState("US");
    const navigate = useNavigate()

    const selectCountryHandler = (value) => setSelectedCountry(value);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const addTripToDB = async () => {
        const docRef = await addDoc(collection(db, "trips"), {
            owner: auth.currentUser.uid,
            ...formData

        }

        );
        let tripId = docRef.id
        console.log(tripId)
        addTripToMatched(tripId)
    }

    const addTripToMatched = async (id) => {
        const userDocRef = doc(db, `users/${auth.currentUser.uid}`)
        try {
            await updateDoc(userDocRef, {
                matched: arrayUnion(id)
            });
            console.log(`Document  updated successfully.`);
        } catch (err) {
            console.error(`Error updating document:`, err);
        }
    }



    const handleSubmit = () => {
        addTripToDB()
        navigate('/chats')
    }
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <MobileStepper
                variant='dots'
                activeStep={activeStep}
                steps={4}
                position="static"
                sx={{ minWidth: '100%', justifyContent: 'center', marginBottom: '1em' }}
            >
                {/* {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))} */}

            </MobileStepper>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    {activeStep === 0 && (
                        <>
                            <Select
                                label="Trip Location"
                                name="location"
                                fullWidth
                                margin="normal"
                                value={selectedCountry}
                                onChange={(e) => {

                                    selectCountryHandler(e.target.value)
                                    handleChange(e)
                                }}
                            >
                                {!!countryArr?.length &&
                                    countryArr.map(({ label, value }) => (
                                        <MenuItem key={value} value={value}>
                                            {label}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <Typography>From: </Typography>
                                <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                                <Typography>Until: </Typography>
                                <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
                            </LocalizationProvider>
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            {/* <Typography variant="h6">Step 2</Typography> */}
                            <TextField
                                label="Title"
                                name="trip_title"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />


                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            {/* <Typography variant="h6">Step 3</Typography> */}
                            <div>
                                {
                                    hobbies.map((hobby) => {
                                        return (
                                            <Checkbox name='interests' icon={<Chip variant="outlined" label={hobby} />} checkedIcon={<Chip variant="outlined" color="info" label={hobby} />} />
                                        )
                                    })
                                }


                            </div>
                        </>
                    )}
                    {activeStep === 3 && (
                        <>
                            {/* <Typography variant="h6">Step 4</Typography> */}
                            <ImageList cols={3} rowHeight={100}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item.img} sx={{ p: '2px' }}>
                                        <img
                                            src={`${item.img}`}
                                            srcSet={`${item.img}`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {activeStep > 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleBack}


                            sx={{ // Set minimum width
                                borderRadius: '20px',
                            }}
                        >
                            Back
                        </Button>
                    )}
                    {activeStep !== steps.length - 1 && (<Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}

                        sx={{ // Set minimum width
                            borderRadius: '20px',
                            marginLeft: 8
                        }}
                    >
                        Next
                    </Button>)}


                    {activeStep === steps.length - 1 && (<Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ // Set minimum width
                            borderRadius: '20px',
                            marginLeft: 8
                        }}
                    >
                        Submit
                    </Button>)}

                </Grid>
            </Grid>
        </Container>
    );
};

export default TripForm