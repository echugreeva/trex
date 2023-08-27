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


const steps = ["Step 1", "Step 2", "Step 3"];
const hobbies = ['Adventure', 'Hiking', 'Beach', 'Mountains', 'Forest', 'City', 'Nature', 'History', 'Art', 'Music', 'Food', 'Nightlife', 'Backpacking', 'Culture', 'Luxury', 'Yoga', 'Wine', 'Meditation'
]

//in the future get all input fields and step in props and generate form as a function

const OnboardingForm = () => {

    const [user, loading, error] = useAuthState(auth)

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
    // const handleSubmit = () => {
    //     addToLocalStorage('newUser', formData)
    //     setFormData({})
    //     navigate('/home')
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user) {
            // const userId = auth.currentUser.uid;
            // // console.log(user)
            // // console.log('User ID:', userId);
            // const q = query(collection(db, 'users'));
            

            // try {

            //     const querySnapshot = await getDocs(q);
            //     querySnapshot.forEach(async (docu) => {
            //         if (docu.data().uid == userId) {
                        // const userDocRef = doc(db, 'users', docu.id);
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
            //     );
            //     // await updateDoc(userDocRef, {
            //     //     ...formData,
            //     //   created: Timestamp.now()
            //     // })

            // } catch (err) {
            //     alert(err)
            // }


            // Now you can use the userId to log user ads data as shown in the previous example.
            //   } else {
            //     // No user is signed in
            //     console.log('No user is signed in.');
            //   }
            // try {
            //     await addDoc(collection(db, 'users'), {...formData, created: Timestamp.now()
            //     })
            //     setFormData({})
            //     navigate('/home')
            //     // onClose()
            // } catch (err) {
            //     alert(err)
            // }
    //     }

    // }
    // User is signed in, you can get the user ID

    useEffect(() => {
        
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);

   useEffect(()=>{
    console.log(user)
   },[])
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