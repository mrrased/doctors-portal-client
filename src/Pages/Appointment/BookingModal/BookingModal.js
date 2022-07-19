import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Backdrop } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import useAuth from '../../../Hooks/useAuth';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const BookingModal = ({handleClose, bookingOpen, booking, date, setAppointmentSuccess}) => {
    const {name, time, price} = booking;
    const {user} = useAuth()
    const initializeInfo = {patientName: user.displayName, email: user.email, phone: '', }
    const [bookingInfo, setBookingInfo] = useState(initializeInfo);

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = {...bookingInfo};
        newInfo[field] = value;
        console.log(newInfo);
        setBookingInfo(newInfo);
    }

    const handleBookingClick = e =>{
        e.preventDefault()
        // collect data
        const appointment = {
            ...bookingInfo,
            time,
            price,
            serviceName: name,
            date: date.toLocaleDateString()
        }
        // data send to server side
        fetch('https://gentle-cove-17963.herokuapp.com/appointment', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
        .then(res=> res.json())
        .then(data => {
            if(data.insertedId){
                
                setAppointmentSuccess(true);
                handleClose();
            }
        })
        

    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={bookingOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
            <Fade in={bookingOpen}>
            <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {name}
            </Typography>
                <form action="">
                    <TextField
                        sx={{width: '90%', my: 2}}
                        disabled
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue={time}
                        variant="filled"
                        size="small"
                    />
                    <TextField
                        sx={{width: '90%', my: 2}}
                        disabled
                        hiddenLabel
                        id="filled-hidden-label-small"
                        defaultValue={price}
                        variant="filled"
                        size="small"
                    />
                    <TextField
                        sx={{width: '90%'}}
                       
                        hiddenLabel
                        id="filled-hidden-label-small"
                        placeholder='Your Name'
                        onBlur={handleOnBlur}
                        name='patientName'
                        defaultValue={user?.displayName}
                        variant="filled"
                        size="small"
                    />
                    <TextField
                        sx={{width: '90%', my: 2}}
                        
                        hiddenLabel
                        id="filled-hidden-label-small"
                        name='phone'
                        onBlur={handleOnBlur}
                        placeholder='Phone Number'
                        defaultValue=""
                        variant="filled"
                        size="small"
                    />
                    <TextField
                        sx={{width: '90%'}}
                        
                        hiddenLabel
                        id="filled-hidden-label-small"
                        name='email'
                        onBlur={handleOnBlur}
                        placeholder='Your Email'
                        defaultValue={user?.email}
                        variant="filled"
                        size="small"
                    />
                    <TextField
                        sx={{width: '90%', my: 2}}
                        disabled
                        hiddenLabel
                        id="filled-hidden-label-small"
                        placeholder='mm/dd/yy'
                        defaultValue={date.toDateString()}
                        variant="filled"
                        size="small"
                    />
                    <Button onClick={handleBookingClick} type="submit" variant="contained">Submit</Button>
                </form>
                    
            </Box>
            </Fade>
        </Modal>
    
    );
};

export default BookingModal;