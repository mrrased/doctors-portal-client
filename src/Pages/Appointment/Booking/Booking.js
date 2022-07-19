import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({booking, date, setAppointmentSuccess}) => {

    const {name, time, space, price} = booking;
    // console.log(props.booking.name);
    const [bookingOpen, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleClose = () => setBookingOpen(false);
    return (
        
        <>
            <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center', my: 4,}}>
                <Paper elevation={1}>
                <Box sx={{py: 3}}>
                <Typography sx={{color: 'info.main', fontWeight: 400 }} variant='h5' component="div">
                    {name}
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 400 }}  component="div">
                    {time}
                </Typography>
                <Typography variant='h6' sx={{ fontWeight: 400 }}  component="div">
                   ${price}
                </Typography>
                <Typography variant='caption' component="div">
                    {space} SPACES AVAILABLE
                </Typography><br />
                <Button onClick={handleBookingOpen} variant='contained'>BOOK APPOINTMENT</Button>
                </Box>
                </Paper>
                
            </Grid>
            <BookingModal
            date={date}
            booking={booking}
            handleClose={handleClose}
            bookingOpen={bookingOpen}
            setAppointmentSuccess={setAppointmentSuccess}
            >

            </BookingModal>
        </>
        
    );
};

export default Booking;