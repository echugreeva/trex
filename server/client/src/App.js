import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
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
import ErrorBoundary from "./components/ErrorBoundary";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './config/firebase'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'
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
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container disableGutters maxWidth="xs">
          <Container disableGutters maxWidth="xs" sx={{
            display: 'flex', flexDirection: 'column', height: '95vh', border: '1px solid'
          }} >
            <CssBaseline />
            <Header />
            <Container sx={{ flex: 1, overflowY: 'auto', border: '1px solid' }} disableGutters >
              <Routes>
                <Route path='/onboarding' element={<ErrorBoundary><OnboardingForm /></ErrorBoundary>} />
                <Route path='settings' element={<ErrorBoundary><UserSettings /></ErrorBoundary>} />
                <Route path='/' element={<ErrorBoundary><Login /></ErrorBoundary>} />
                <Route path='/reset' element={<ErrorBoundary><Reset /></ErrorBoundary>} />
                <Route path='/register' element={<ErrorBoundary><Register /></ErrorBoundary>} />
                <Route path='/home' element={<ErrorBoundary><Home /></ErrorBoundary>} />
                <Route path='/chats' element={<ErrorBoundary><ChatWishListScreen /></ErrorBoundary>} />
                <Route path='/settings' element={<ErrorBoundary><Home /></ErrorBoundary>} />
                <Route path="/chats/:person" element={<ErrorBoundary><SingleChat /></ErrorBoundary>} />
                <Route path="/newtrip" element={<ErrorBoundary><TripForm /></ErrorBoundary>} />
                <Route path='/profile' element={<ErrorBoundary><Profile /></ErrorBoundary>} />
              </Routes>
            </Container>
          </Container>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
