import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SpinnerCircle from './SpinnerCircle'
import dashboardApi from '../api/dashboard.api';


function BillForm(props) {

    const [companyName, setCompanyName] = useState('');
    const [balanceDue, setBalanceDue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleBillDetailsSubmission = () => {
        setIsLoading(true);
        setTimeout(() => {
            dashboardApi.createBillingDetails(companyName, balanceDue)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
            setIsLoading(false);
        },500)
    }

    return (
        <Container style={{ padding: '20px 5px' }} className="billform__container">
            <Row className="g-2">
                <Col md={5}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Enter Company" onChange={(e) => setCompanyName(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={5}>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control type="number" placeholder="Enter balance" onChange={(e) => setBalanceDue(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Button onClick={handleBillDetailsSubmission}>
                    {
                        (isLoading) 
                        ? (<SpinnerCircle />)
                        : (<span>Add</span>)
                    }
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default BillForm;