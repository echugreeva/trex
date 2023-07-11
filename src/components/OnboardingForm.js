import { useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Button,
    TextField,
    Stepper,
    Step,
    StepLabel,
    Checkbox,
    Chip

} from "@mui/material";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
const hobbies = ['Adventure', 'Hiking', 'Beach', 'Mountains', 'Forest', 'City', 'Nature', 'History', 'Art', 'Music', 'Food', 'Nightlife', 'Backpacking', 'Culture', 'Luxury', 'Yoga', 'Wine', 'Meditation'
]

//in the future get all input fields and step in props and generate form as a function

const OnboardingForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});

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

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    {activeStep === 0 && (
                        <>
                            <Typography variant="h6">Step 1</Typography>
                            <TextField
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
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
                            <Typography variant="h6">Step 2</Typography>
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
                            <TextField
                                label="Your home location"
                                name="home-location"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />


                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            <Typography variant="h6">Step 3</Typography>
                            <div>
                                {
                                    hobbies.map((hobby) => {
                                        return (
                                            <Checkbox icon={<Chip variant="outlined" label={hobby} />} checkedIcon={<Chip variant="outlined" color="info" label={hobby} />} />
                                        )
                                    })
                                }

    
                            </div>
                        </>
                    )}
                    {activeStep === 3 && (
                        <>
                            <Typography variant="h6">Step 4</Typography>
                            <TextField
                                label="Bio"
                                name="bio"
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />


                        </>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                    >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                    {activeStep > 0 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleBack}
                            sx={{ marginLeft: 8 }}
                        >
                            Back
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default OnboardingForm