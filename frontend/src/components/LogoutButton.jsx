import React from 'react';
import { Button } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'
function LogoutButton(props) {
    const history = useHistory()
    const handleLogout = () => {
        history.push('/logout')
    }
    return (
        <Button variant="primary" type="button" onClick={() => handleLogout()}>Logout</Button>
    );
}

export default LogoutButton;