import React from 'react';
import { Spinner } from 'react-bootstrap'

function SpinnerCircle({ size, variant }) {
    return (
        <div>
            <Spinner animation="border" variant={variant ?? "light"} size={size} />
        </div>
    );
}

export default SpinnerCircle;