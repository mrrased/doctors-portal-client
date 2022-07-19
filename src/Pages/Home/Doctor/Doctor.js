import React from 'react';
import { Grid, Typography } from '@mui/material';

const Doctor = ({doctor}) => {
    const {name, image} = doctor;
    console.log({doctor})
    return (
        <Grid item xs={12} sm={6} md={4}>
                <img style={{width: '200px'}} src={`data:image/jpeg;base64,${image}`} alt="" />
               <Typography variant="h6" component="h5">
               {name}
                </Typography>
        </Grid>
    );
};

export default Doctor;