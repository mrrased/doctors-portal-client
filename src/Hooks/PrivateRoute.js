import { LinearProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ children }) => {
    const {user, isLoading} = useAuth();
    const location = useLocation();
    if(isLoading){return <LinearProgress />}
    if (!user.email) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    
      return children;
};

export default PrivateRoute;