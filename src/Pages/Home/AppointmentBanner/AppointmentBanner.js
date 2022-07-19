import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import bg from '../../../images/appointment-bg.png';
import doctor from '../../../images/doctor.png';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';


const appointmentBanner = {

    background: `url(${bg})`,
    backgroundColor: 'rgba(11, 36, 58, .7)',
    backgroundBlendMode: 'darken, luminosity',
    marginTop: 100

}
const AppointmentBanner = () => {


    return (
    <Box style={appointmentBanner} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
            <Grid item xs={12} md={5} style={{textAlign: 'right'}}>
                <Box>
                    <img
                    style={{width: 500, marginTop: '-123px', textAlign: 'center'}}
                    src={doctor} alt="" />
                </Box>
            </Grid>
            <Grid item xs={4} md={6} sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'left'
            }}>
                <Box >
                    <Typography sx={{ mt: 2 }} variant="h5" component="div" color="#16C6E9">
                            Appointment
                    </Typography>
                    <Typography sx={{ mt: 2 , fontWeight: 500}} variant="h2" component="div" color="white">
                            Make an appointment Today
                    </Typography>
                    <Typography sx={{ my: 2 , fontWeight: 'medium'}} variant="p" component="div" color="white">
                            it is a long established fact a reader will be distractedly the readable content of a pge when looking at its.
                    </Typography>
                    <Button variant="contained">LEARN MORE</Button>
                </Box>
            </Grid>
      </Grid>
    </Box>
    );
};

export default AppointmentBanner;