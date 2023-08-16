import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import WishList from '../Wishlist';
import ChatScreen from '../chat/ChatsScreen'

export default function LabTabs() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered sx={{ borderBottom: 'none' }}>
            <Tab label="Chats" value="1" />
            <Tab label="WishList" value="2" />
            
          </TabList>
        </Box>
        <TabPanel value="1"><ChatScreen/></TabPanel>
        <TabPanel value="2"><WishList/></TabPanel>
      </TabContext>
    </Box>
  );
}