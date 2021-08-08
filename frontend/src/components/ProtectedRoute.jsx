import React from 'react';
import AuthService from '../services/authService'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ ...rest }) => {
    return (
        AuthService.isAuthenticated()
            ? <Route {...rest} />
            : <Redirect to={{
                pathname: '/login',
            }} />
    );
};

export default ProtectedRoute;