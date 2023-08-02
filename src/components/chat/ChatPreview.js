import React from "react";

import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ChatPreview = ({ name, message, profilePic, timestamp }) => {
    return (
        <Link to={`/chats/${name}`}>
        <ListItem >
            
            <ListItemAvatar>
                <Avatar src={profilePic} />
            </ListItemAvatar>

            <ListItemText sx={{display: 'flex'}}>
                <Typography>{name}</Typography>
                <Typography>{message}</Typography>
                <Typography>{timestamp}</Typography>
            </ListItemText>

        </ListItem>
        </Link>
    );
};

export default ChatPreview;