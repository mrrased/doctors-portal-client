import { Alert, Button, Container, Grid, LinearProgress, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import login from '../../images/login.png';

const Login = () => {

    const [loginData, setLoginData] = useState({});
    const {signWithUser, user, err, isLoading, signInWithGoogle} = useAuth();

    const location = useLocation();
    const history = useNavigate()

    const handleOnChange = e =>{
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
        // console.log(field, value);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        signWithUser(loginData.email, loginData.password, location, history)
        // alert('Submit Success');
        // history('/home')
        
    }

    const handleSignInWithGoogle = (e) =>{
        e.preventDefault();
        signInWithGoogle(location, history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography sx={{textAlign: 'center', mt: 4}} variant="h6" component="h6">
                    Login
                </Typography>;
                {isLoading && <LinearProgress />}
                <Box sx={{textAlign: 'center'}}>
                    <form onSubmit={handleSubmit}>
                    <TextField 
                        sx={{width: '75%', my: 2 }}
                        onChange={handleOnChange}
                        id="standard-basic"
                        name='email'
                        type="email" 
                        label="Your Email" 
                        variant="standard" 
                    />
                    <TextField 
                        sx={{width: '75%'}}
                        onChange={handleOnChange}
                        id="standard-basic"
                        name='password' 
                        label="Your Password" 
                        type="password"
                        variant="standard" 
                    />
                    <Button type="submit" sx={{width: '75%', my: 3}} variant="contained">Login</Button>
                    </form>

                    <NavLink to='/register'>New User? Register Now</NavLink>

                    <Button type="button" onClick={handleSignInWithGoogle} sx={{width: '75%', my: 3, }} >Google SignIn </Button>
                    {
                        user?.email && <Alert severity="success">Login Successful !!</Alert>
                    }
                    {err && <Alert severity="error">{err}</Alert>}
                    
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

export default Login;