import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertMessage({ heading, variant, message, show, setShow }) {
    return (
        (show)
            ? (<Alert variant={variant} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{heading}</Alert.Heading>
                <p>
                    {message}
                </p>
            </Alert>)
            : <></>
    );
}

export default AlertMessage;