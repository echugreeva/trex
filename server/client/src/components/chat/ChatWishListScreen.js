import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import WishList from '../Wishlist';
import ChatScreen from '../chat/ChatsScreen'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from '../../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
import ErrorBoundary from '../ErrorBoundary';

export default function LabTabs() {
  const [value, setValue] = useState('1');
  const [user, loading, error] = useAuthState(auth)
  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          // ...
        } else {
            return navigate("/");
          // User is signed out
          // ...
        }
      });
 },[]) 

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered sx={{ borderBottom: 'none' }}>
            <Tab label="Chats" value="1" />
            <Tab label="WishList" value="2" />
            
          </TabList>
        </Box>
        <TabPanel value="1"><ErrorBoundary><ChatScreen/></ErrorBoundary></TabPanel>
        <TabPanel value="2"><ErrorBoundary><WishList/></ErrorBoundary></TabPanel>
      </TabContext>
    </Box>
  );
}