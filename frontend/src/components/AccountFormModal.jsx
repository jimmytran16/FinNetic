import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import SpinnerCircle from './SpinnerCircle'
import DashboardAPI from '../api/dashboard.api';


function AccountFormModal({ reload, setReload }) {

    const [accountName, setAccountName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [balanceDue, setBalanceDue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBillDetailsSubmission = () => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.createBillingDetails(accountName, accountHolderName, balanceDue)
                .then(response => {
                    setReload(!reload)
                    setAccountHolderName('')
                    setAccountName('')
                    setBalanceDue(0)
                })
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
                            <Form.Control value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridHolderName">
                            <Form.Label>Account holder name</Form.Label>
                            <Form.Control value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} placeholder="Account holder name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAccountBalance">
                            <Form.Label>Account balance</Form.Label>
                            <Form.Control value={balanceDue} onChange={(e) => setBalanceDue(e.target.value)} type="number" placeholder="Account balance" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleBillDetailsSubmission}>
                        { isLoading ? <SpinnerCircle size='sm' /> : 'Add' }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AccountFormModal;