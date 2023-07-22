import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container';
import OnboardingForm from './components/OnboardingForm';
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
    <Container maxWidth="sm" >
      <Routes>
        <Route path='/' element={<OnboardingForm/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      
      
    </Container>
    </BrowserRouter>
  );
}

export default App;
