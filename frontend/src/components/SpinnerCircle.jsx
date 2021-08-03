import React from 'react';
import { Spinner } from 'react-bootstrap'

function SpinnerCircle({ size }) {
    return (
        <div>
            <Spinner animation="border" variant="light" size={size} />
        </div>
    );
}

export default SpinnerCircle;