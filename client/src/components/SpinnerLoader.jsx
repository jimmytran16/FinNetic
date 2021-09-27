import React from 'react';
import { Spinner, Container } from 'react-bootstrap'

const SpinnerLoader = (props) => {
    return (
        <Container style={{ textAlign: 'center' }}>
            <Spinner animation="grow" />
        </Container>
    )
}

export default SpinnerLoader;