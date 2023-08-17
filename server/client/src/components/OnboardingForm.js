import { useState } from "react";
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

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const hobbies = ['Adventure', 'Hiking', 'Beach', 'Mountains', 'Forest', 'City', 'Nature', 'History', 'Art', 'Music', 'Food', 'Nightlife', 'Backpacking', 'Culture', 'Luxury', 'Yoga', 'Wine', 'Meditation'
]

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
    const handleSubmit = () => {
        addToLocalStorage('newUser', formData)
        setFormData({})
        navigate('/home')
    }
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <MobileStepper
                variant='dots'
                activeStep={activeStep}
                steps={4}
                position="static"
                sx={{ minWidth: '100%', justifyContent: 'center', marginBottom: '1em'}}
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
                            {/* <Typography variant="h6">Step 1</Typography> */}
                            <TextField
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                type="password"
                                label="Password"
                                name="password"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </>
                    )}
                    {activeStep === 1 && (
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
                    {activeStep === 2 && (
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
                    {activeStep === 3 && (
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
                borderRadius: '20px',}}
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
                marginLeft: 8 }}
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

export default OnboardingForm