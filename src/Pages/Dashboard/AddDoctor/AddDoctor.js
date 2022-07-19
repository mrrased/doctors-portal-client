import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';


const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState('');
    console.log('name:',name);
    console.log('email',email);

    const handleSubmit = e =>{
        e.preventDefault();
        if(!image){
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://gentle-cove-17963.herokuapp.com/doctors', {

            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                setSuccess('Doctor Adding Success');
            }
        })
        .catch(error => {
            setSuccess('');
            console.error('Error:', error);
        });
    }
    return (
        <div>
            {success ?<Box sx={{textAlign: 'center', color: 'green'}}><h3>{success}</h3></Box>: ''}
            <form onSubmit={handleSubmit}>
                <Box sx={{textAlign:'center'}}>
                    <TextField
                        sx={{width: '50%' , my: 1}}
                        id="filled-password-input"
                        label="Name"
                        onChange={(e)=> setName(e.target.value)}
                        required
                        type="name"
                        autoComplete="current-password"
                        variant="filled"
                    />
                    <br />
                    <TextField
                        sx={{width: '50%' , my: 1}}
                        id="filled-password-input"
                        label="Email"
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                        type="email"
                        autoComplete="current-password"
                        variant="filled"
                    /><br/>
                    <Input
                        sx={{width: '50%' , my: 1}} 
                        required
                        accept="image/*"
                        onChange={e=> setImage(e.target.files[0])} 
                        id="contained-button-file" 
                        multiple type="file" 
                    /><br/>
                    <Button 
                        sx={{width: '50%' , my: 1}}
                        variant="contained" 
                        type='submit'
                    >
                        Submit
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddDoctor;