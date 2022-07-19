import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



const Service = (props) => {

    const {img, description, name} = props.service;
    return (
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 275 , border: 0, boxShadow: 0, textAlign: 'center'}}>
                <CardContent sx={{ mt: 6 }}>
                    <CardMedia 
                            component="img"
                            style={{width: 'auto', height: '80px', margin: '0 auto'}}
                            image={img}
                            alt="green iguana"
                        />
                    <Typography sx={{ mt: 4 }} variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ mt: 2 }} variant="body2">
                    {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Service;