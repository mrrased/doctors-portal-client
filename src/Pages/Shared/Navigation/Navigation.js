import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Navigation = () => {
    const {user, logOut} = useAuth();

    const signOutUser = e =>{
        e.preventDefault();
        logOut();
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Congratulations
                    </Typography>
                    <NavLink to="/appointment" ><Button color="inherit">Appointment</Button></NavLink>
                    <NavLink  style={{textDecoration: 'none', color: 'white'}} to="/dashboard">
                        <Button color="inherit">Dashboard</Button>
                    </NavLink>
                    {
                        user?.email? 
                        <Button onClick={signOutUser} color="inherit">LogOut</Button> :
                        <NavLink style={{textDecoration: 'none', color: 'white'}} to="/login">
                        <Button color="inherit">Login</Button>
                        </NavLink>
                    }
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Navigation;