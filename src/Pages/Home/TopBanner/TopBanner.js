import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Container, Typography } from '@mui/material';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Box } from '@mui/system';

const bannerBg = {
    background: `url(${bg})`,
    // height: 400
}

const vertical ={
    display: 'flex',
    alignItems: 'center',
    height: 400,
}

const TopBanner = () => {
    return (
        <Container style={bannerBg} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={vertical}>
          <Box>
          <Typography variant='h3' sx={{ my: 5 , fontWeight: 'medium'}}>
            Your New Smile Starts Here
          </Typography>
          <Typography variant='p' sx={{ my: 2 , fontWeight: 'medium'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti voluptatum magni distinctio odit officia architecto quasi ipsam, possimus repellat minima accusantium mollitia deleniti. Cumque, minus minima? Magnam, illo. Quae, temporibus!
          </Typography><br />
          <Button variant="contained" sx={{ my: 5 , fontWeight: 'medium'}}>GET APPOINTMENT</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} style={vertical}>
          <img 
          style={{height: '300px', alignItems: 'center'}}
          src={chair} alt="" 
          />
        </Grid>
      </Grid>
    </Container>
    );
};

export default TopBanner;