import { Box } from '@mui/system';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51Kp8LCCjV3ct653Qc6xSL78PPu0tiYyRSTUXafHJhjJlbnq4z5dZ1l2tCcti3onTZEJPbW50gcU09sGNGhFSnlbN00H8efWAqT');

const Payment = () => {
    const {appointmentId} = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(()=>{
        fetch(`https://gentle-cove-17963.herokuapp.com/appointment/${appointmentId}`)
        .then(res => res.json())
        .then(data => setAppointment(data))
    },[appointmentId])
    return (
        <div>
            <Box sx={{textAlign: 'center'}}>
            <h2>Patient Name: {appointment.patientName}  For {appointment.serviceName }</h2>
            <p>Payable Price: ${appointment.price}</p>
            {appointment?.price &&
                <Elements stripe={stripePromise}>
                <CheckoutForm 
                
                appointment={appointment}
                />
            </Elements>
            }
            </Box>
        </div>
    );
};

export default Payment;