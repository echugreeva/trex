import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ChatIcon from '@mui/icons-material/Chat';


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
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: "space-around", width: '100%' }}>
                    <IconButton
                    
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color={(window.location.pathname==='/')?'red':"inherit"}
                        onClick={
                            () => {
                                navigate('/')
                            }
                        }
                    >
                        <AccountCircle />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color={(window.location.pathname==='/home')?'red':"inherit"}
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={
                            () => {
                                navigate('/home')
                            }
                        }
                    >
                        <TravelExploreIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color={(window.location.pathname==='/chats')?'red':"inherit"}
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={
                            () => {
                                navigate('/chats')
                            }
                        }
                    >
                        <ChatIcon />
                    </IconButton>





                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header