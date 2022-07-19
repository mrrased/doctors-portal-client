import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {

    const [doctorsInfo, setDoctorsInfo] = useState([]);

    useEffect(()=>{
        fetch('https://gentle-cove-17963.herokuapp.com/doctors')
        .then(res => res.json())
        .then(data => setDoctorsInfo(data));
    },[])
    return (
        <div>
            <h3>Doctors: {doctorsInfo.length}</h3>
            <Grid container spacing={2}>
                {
                    doctorsInfo.map(doctor => <Doctor
                    key={doctor._id}
                    doctor={doctor}
                    >
                    </Doctor>)
                }
            </Grid>
        </div>
    );
};

export default Doctors;