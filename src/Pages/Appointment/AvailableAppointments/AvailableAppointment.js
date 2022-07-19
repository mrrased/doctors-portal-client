import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Alert, Container, Typography } from '@mui/material';
import Booking from '../Booking/Booking';


const timeSlots = [
    {id: 1, price: 12, name: 'Teeth Orthodontics', time: '8:00 AM - 9:00 AM', space: 10},
    {id: 2, price: 26, name: 'Cosmetic Dentistry', time: '10:00 AM - 11:30 AM', space: 10},
    {id: 3, price: 11, name: 'Teeth Cleaning', time: '5:00 PM - 6:30 PM', space: 10},
    {id: 4, price: 23, name: 'Cavity Protection', time: '7:00 AM - 8:30 AM', space: 10},
    {id: 5, price: 13, name: 'Teeth Orthodontics', time: '8:00 AM - 9:00 AM', space: 10},
    {id: 6, price: 17, name: 'Teeth Orthodontics', time: '8:00 AM - 9:00 AM', space: 10},
]

const AvailableAppointment = ({date}) => {

    const [appointmentSuccess, setAppointmentSuccess] = useState(false);
    return (
        <Container sx={{ flexGrow: 1 , my: 20}}>
            <Typography variant='h5' component="div" sx={{color: 'info.main', fontWeight: 400, my: 4 }} style={{textAlign: 'center'}}>Available Appointment{date.toDateString()}</Typography>
            {
                appointmentSuccess && <Alert severity="success">Congratulations Appointment Booked success!</Alert>
            }
            <Grid container spacing={2}>
                    {
                        timeSlots.map(booking=> <Booking 
                            key={booking.id}
                            date={date}
                            booking={booking}
                            setAppointmentSuccess={setAppointmentSuccess}
                            ></Booking>)
                    }
                
            </Grid>
        </Container>
        
        
    );
};

export default AvailableAppointment;