import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';
import Service from '../Service/Service';
import Typography from '@mui/material/Typography';


const services = [
    {
        name: 'Fluoride Treatment',
        description: 'lorem In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without',
        img: fluoride
    },
    {
        name: 'Cavity Filling',
        description: 'lorem In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without',
        img: cavity
    },
    {
        name: 'Teat Whitening',
        description: 'lorem In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without',
        img: whitening
    },
]

const Services = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ mt: 4 , color: 'success.main', fontWeight: 600, textAlign: 'center'}} variant="h6" component="div">
                        Our Services
                    </Typography>
                <Typography sx={{ mt: 4 , fontWeight: 600, textAlign: 'center'}} variant="h4" component="div">
                        Service We Provide
                    </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        services.map(service=><Service
                        key={service.name}
                        service={service}
                        ></Service>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;