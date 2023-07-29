
import React from "react";
import List from '@mui/material/List';
import ChatPreview from "./ChatPreview"
import Divider from '@mui/material/Divider';

const ChatScreen = () => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ChatPreview
                name="Jason"
                message="Hej"
                timestamp="6 mins ago"
                profilePic="https://images.pexels.com/photos/7533347/pexels-photo-7533347.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <Divider variant="inset" component="li" />
            <ChatPreview
                name="Beach vacay summer 2023"
                message="you got invited"
                timestamp="1 hr ago"
                profilePic="https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&w=1600" />
        </List>
    )
};

export default ChatScreen;