import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Container from '@mui/material/Container';
import OnboardingForm from './components/OnboardingForm';
import Home from './components/Home';
import ChatWishListScreen from './components/chat/ChatWishListScreen'
import Header from './components/Header'
import SingleChat from './components/chat/SingleChat'
import TripForm from "./components/TripForm";
import Profile from './components/Profile';
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {CssBaseline} from '@mui/material'
import UserSettings from "./components/UserSettings";

const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#01cdd5',
      },
      secondary: {
        main: '#F0268D',
      },
      success: {
        main: '#10CC96',
      },
      info: {
        main: '#FFE43D',
      },
      warning: {
        main: '#FFB42D',
      },
      error: {
        main: '#ff0044',
      },
    },
    typography: {
      fontFamily: 'lato',
      h1: {
        fontFamily: 'Raleway',
      },
      h2: {
        fontFamily: 'Raleway',
      },
      h3: {
        fontFamily: 'Raleway',
      },
      h4: {
        fontFamily: 'Raleway',
      },
    },
  }
)


function App() {
  const [user, setUser] = useState('')
  const [currentTrip, setCurrentTrip] = useState('')
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container disableGutters maxWidth="xs" sx={{
          display: 'flex', flexDirection: 'column', height: '100vh', border:'1px solid'
        }} >
          <CssBaseline/>
          <Header />
          <Container sx={{ flex: 1, overflowY: 'auto',  border:'1px solid'}} disableGutters >
            <Routes>
              <Route path='/onboarding' element={<OnboardingForm />} />
              <Route path='settings'element={<UserSettings />} />
              <Route path='/' element={<Login/>} />
              <Route path='/reset' element={<Reset/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/home' element={<Home />} />
              <Route path='/chats' element={<ChatWishListScreen />} />
              <Route path='/settings' element={<Home />} />
              <Route path="/chats/:person" element={<SingleChat />} />
              <Route path="/newtrip" element={<TripForm />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </Container>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
