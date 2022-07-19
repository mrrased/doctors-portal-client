import { Button, Container, Grid, TextField, Typography, LinearProgress, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import login from '../../images/login.png';

const Registers = () => {

    const [loginData, setLoginData] = useState({});
    const {registerUser, isLoading, user, err} = useAuth();
    
    const location = useLocation();
    const history = useNavigate();

    const handleChange = e =>{
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData);
    }

    const handleSubmit = e =>{
        e.preventDefault();
            if(loginData.password !== loginData.confirmPassword){

                alert('Your Password Did not Match');
                return;
            }
            else{
                console.log(loginData.name);
                registerUser(loginData.email, loginData.password, loginData.name, location, history )
                
                // alert('login Successful');
                // history('/home')
            }
    
    }
    return (
        <Container>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography sx={{textAlign: 'center', mt: 4}} variant="h6" component="h6">
                    Login
                </Typography>;
                <Box sx={{textAlign: 'center'}}>
                    {!isLoading && <form onSubmit={handleSubmit}>
                        
                        <TextField 
                            sx={{width: '75%', my: 2 }}
                            onBlur={handleChange}
                            id="standard-basic"
                            name='name' 
                            label="Your Name" 
                            variant="standard" 
                        />
                        <TextField 
                            sx={{width: '75%', my: 2 }}
                            onBlur={handleChange}
                            id="standard-basic"
                            name='email'
                            type="email" 
                            label="Your Email" 
                            variant="standard" 
                        />
                        <TextField 
                            sx={{width: '75%'}}
                            onBlur={handleChange}
                            id="standard-basic"
                            name='password' 
                            label="Your Password" 
                            type="password"
                            variant="standard" 
                        />
                        <TextField 
                            sx={{width: '75%'}}
                            onBlur={handleChange}
                            id="standard-basic"
                            name='confirmPassword' 
                            label="Confirm Password" 
                            type="password"
                            variant="standard" 
                        />
                        <Button type="submit" sx={{width: '75%', my: 3}} variant="contained">register</Button>
                    </form>}
                    {isLoading && <LinearProgress />}
                    <NavLink 
                    
                    to='/login'
                    >Already registered? Login Now</NavLink>
                    {
                        user?.email && <Alert severity="success">Congratulations Your registration success!</Alert>
                    }
                    {err && <Alert sx={{textAlign: 'center'}} severity="error">{err}</Alert>}

                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
            <img 
                style={{width: '100%', }}
                src={login} alt="" />
            </Grid>
            </Grid>
        </Container>
    );
};

export default Registers;