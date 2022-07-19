import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const CheckoutForm = ({appointment}) => {

    const { price, patientName , _id} = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth()
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState('');

    useEffect(()=>{
        fetch('https://gentle-cove-17963.herokuapp.com/create-payment-intent',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
    },[price])

    const handleSubmit= async(e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }
        setProcessing(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
          if(error){
            setError(error.message);
          }
          else{
              setError('');
              console.log('[PaymentMethod', paymentMethod)
        }
        // stripe confirm Payment
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patientName,
                  email: user?.email
                },
              },
            },
        );
          if(intentError){
            setError(intentError.message)
          }
          else{
              setError('');
              setSuccess('Your Payment Processed Successful')
            //   console.log(paymentIntent);
              setProcessing(false)
              const payment =  {
                  amount: paymentIntent.amount,
                  created: paymentIntent.created,
                  last4: paymentIntent?.card?.last4,
                  transaction: paymentIntent.client_secret.slice('_secret')[0]
              }
              
                const url =`https://gentle-cove-17963.herokuapp.com/appointment/${_id}`;
                fetch(url,{
                    method: 'PUT',
                    headers:{
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(payment)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.modifiedCount){
                        setPaymentSuccess(data.modifiedCount)
                    }
                })
              
          }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                    style: {
                        base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                        },
                        invalid: {
                        color: '#9e2146',
                        },
                    },
                    }}
                />
                {processing ? <CircularProgress/> : <button type="submit"  disabled={!stripe || paymentSuccess}>
                    Pay ${price}
                </button>}
            </form>
            {
                error && <Box sx={{color: 'red'}}><p>{error} !!!</p></Box>
            }
            {
                success && <Box sx={{color: 'green'}}><p>{success} !!!</p></Box>
            }
        </div>
    );
};

export default CheckoutForm;


/*  
1. install stripe and stripe-react
2. set publishable key
3. Elements
4. Check out Form
...........
5. Create payment method
6. service create payment intent api
7. Load Client secret
8.ConfirmCard payment
9. handle User error

*/