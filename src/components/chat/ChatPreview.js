import React from "react";

import { useNavigate } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ChatPreview = ({ name, message, profilePic, timestamp }) => {
    const navigate = useNavigate()
    return (
       
        <ListItem onClick={()=>{navigate(`/chats/${name}`)}}>
            
            <ListItemAvatar>
                <Avatar src={profilePic} />
            </ListItemAvatar>

            <ListItemText sx={{display: 'flex'}}>
                <Typography>{name}</Typography>
                <Typography>{message}</Typography>
                <Typography>{timestamp}</Typography>
            </ListItemText>

        </ListItem>
       
    );
};

export default ChatPreview;