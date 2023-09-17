import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    MenuItem

} from "@mui/material";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { getFromLocalStorage, addToLocalStorage } from "../helpers/localStorage";
import { auth, db } from '../config/firebase'
import { collection, addDoc, Timestamp, doc, updateDoc, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";

const steps = ["Step 1", "Step 2", "Step 3"];
const hobbies = ['adventure', 'hiking', 'beach', 'mountains', 'forest', 'city', 'nature',
'history', 'art', 'music', 'food', 'nightlife', 'backpacking', 'culture',
'luxury', 'yoga', 'wine', 'meditation']

//in the future get all input fields and step in props and generate form as a function

const OnboardingForm = () => {

    countries.registerLocale(enLocale);
    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (user&&user.uid) {
            const userDocRef = doc(db, `users/${auth.currentUser.uid}`);
            try {
                await updateDoc(userDocRef, {
                    ...formData,
                    created: Timestamp.now()
                });
                console.log(`Document  updated successfully.`);
            } catch (err) {
                console.error(`Error updating document :`, err);
            }
        }
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return navigate("/");
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

            </MobileStepper>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    {activeStep === 0 && (
                        <>
                            {/* <Typography variant="h6">Step 2</Typography> */}
                            <TextField
                                label="Name"
                                name="name"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Age"
                                name="age"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />

                            <Select
                                label="Home Location"
                                name="home-location"
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


                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            {/* <Typography variant="h6">Step 3</Typography> */}
                            <div>
                                {
                                    hobbies.map((hobby) => {
                                        return (
                                            <Checkbox name="interests" icon={<Chip variant="outlined" label={hobby} />} checkedIcon={<Chip variant="outlined" color="info" label={hobby} />} />
                                        )
                                    })
                                }


                            </div>
                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            {/* <Typography variant="h6">Step 4</Typography> */}
                            <TextField
                                label="Bio"
                                name="bio"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                            />


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
                        onClick={(e) => {
                            handleSubmit(e)
                            navigate('/home')

                        }}
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

export default OnboardingForm