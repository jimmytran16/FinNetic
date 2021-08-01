import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import SpinnerCircle from './SpinnerCircle'
import dashboardApi from '../api/dashboard.api';


function AccountFormModal(props) {

    const [accountName, setAccountName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState(0);
    const [balanceDue, setBalanceDue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBillDetailsSubmission = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(accountName, accountHolderName, balanceDue)
            dashboardApi.createBillingDetails(accountName, accountHolderName, balanceDue)
                .then(response => console.log(response.data))
                .catch(error => console.log(error));
            setIsLoading(false);
        }, 500)
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Account
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Account Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setAccountName(e.target.value)} placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridHolderName">
                            <Form.Label>Account holder name</Form.Label>
                            <Form.Control onChange={(e) => setAccountHolderName(e.target.value)} placeholder="Account holder name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAccountBalance">
                            <Form.Label>Account balance</Form.Label>
                            <Form.Control onChange={(e) => setBalanceDue(e.target.value)} placeholder="Account balance" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleBillDetailsSubmission}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AccountFormModal;