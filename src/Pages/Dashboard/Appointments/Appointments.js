import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../Hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const Appointments = ({date}) => {

    const {user, token} = useAuth();
    const [appointments, setAppointments] = useState([]);
    
    
    useEffect(()=>{
        const url = `https://gentle-cove-17963.herokuapp.com/appointment?email=${user.email}&date=${date}`;
        fetch(url,{
          headers:{
            'authorization' : `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => setAppointments(data))
    },[date, user.email, token])

    return (
        <>
        <h3>Appointments {appointments.length}</h3>
        <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell align="left">{row.time}</TableCell>
              <TableCell align="left">{ row.payment ? 'Paid':
              <NavLink to={`/dashboard/payment/${row._id}`}><Button>Pay</Button></NavLink>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    );
};

export default Appointments;