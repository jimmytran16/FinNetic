import React from 'react';
import { Button } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'
function LogoutButton(props) {
    const history = useHistory()
    const handleLogout = () => {
        history.push('/logout')
    }
    return (
        <Button style={{ backgroundColor:'#52ab98', borderColor:'#52ab98', margin:'0px 10px' }} type="button" onClick={() => handleLogout()}>Logout</Button>
    );
}

export default LogoutButton;