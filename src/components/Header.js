import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TravelExploreSharpIcon from '@mui/icons-material/TravelExploreSharp';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';



const Header = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(true);
    //   const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    //   const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    //   };

    //   const handleClose = () => {
    //     setAnchorEl(null);
    //   };

    return (
        
            <AppBar position="static"  elevation={0} color ='info'sx={{ backgroundColor: "white",width:'100%', border:'1px solid'}}>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                    <IconButton
                    
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color={(window.location.pathname==='/profile')?'success':'white'}
                        onClick={
                            () => {
                                navigate('/profile')
                            }
                        }
                    >
                        <AccountCircleSharpIcon sx={{ fontSize: 40 }}  />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color={(window.location.pathname==='/home')?'success':"white"}
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={
                            () => {
                                navigate('/home')
                            }
                        }
                    >
                        <TravelExploreSharpIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color={(window.location.pathname.includes('/chats'))?'success':"white"}
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={
                            () => {
                                navigate('/chats')
                            }
                        }
                    >
                        <ChatBubbleOutlineSharpIcon sx={{ fontSize: 40 }}/>
                    </IconButton>





                </Toolbar>
            </AppBar>
        
    );
}

export default Header