import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {

const [email, setEmail] = useState('');
const [success, setSuccess] = useState(false);
const {token} = useAuth();


    const adminOnBlur = e =>{
        setEmail(e.target.value);
    }
    const makeSubmitAdmin = e =>{
        e.preventDefault();
        const user = { email }
        // console.log( {email} );
        fetch('https://gentle-cove-17963.herokuapp.com/users/admin',{
            method: 'PUT',
            headers:{
                'authorization': `Bearer ${token}`,
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=> res.json())
        .then(data =>{
            if(data.modifiedCount){
                setSuccess(true);
            }
            console.log(data)
        })
        
    }
    return (
        <div>
            
            <Box sx={{textAlign: 'center'}}><form onSubmit={makeSubmitAdmin}>
            <h1>This is make admin page</h1>
            <TextField sx={{width: '50%'}} onBlur={adminOnBlur} id="standard-basic" label="Email" type='email' variant="standard" />
            <Button type="submit" >Make Admin</Button>
            </form></Box>
            <Box sx={{textAlign: 'center'}}>
            {
                success && <Alert severity="success" >Congratulations New Add Admin success!</Alert>
            }
            </Box>
        </div>
    );
};

export default MakeAdmin;