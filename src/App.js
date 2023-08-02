import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container';
import OnboardingForm from './components/OnboardingForm';
import Home from './components/Home';
import ChatScreen from './components/chat/ChatsScreen'
import Header from './components/Header'
import SingleChat from './components/chat/SingleChat'

function App() {
  return (
    <BrowserRouter>
    <Container maxWidth="sm" >
      <Header/>
      <Routes>
        <Route path='/' element={<OnboardingForm/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/chats' element={<ChatScreen/>}/>
        <Route path='/settings' element={<Home/>}/>
        <Route path="/chats/:person"  element={<SingleChat/>}/>   
      
      </Routes>
      
      
    </Container>
    </BrowserRouter>
  );
}

export default App;
