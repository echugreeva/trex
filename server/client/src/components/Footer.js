import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Restore, Favorite, Archive } from '@mui/icons-material'

import Paper from '@mui/material/Paper';


const Footer = () => {
  const [value, setValue] = useState(0);
  
  return (
    <Paper maxWidth="sm" sx={{ bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation maxWidth="sm"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<Restore />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction label="Archive" icon={<Archive />} />
      </BottomNavigation>
    </Paper>
  )


}

export default Footer