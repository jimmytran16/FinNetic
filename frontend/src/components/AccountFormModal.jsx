import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import SpinnerCircle from './SpinnerCircle'
import DashboardAPI from '../api/dashboard.api';


function AccountFormModal({ reload, setReload }) {

    const [accountName, setAccountName] = useState('');
    const [balanceDue, setBalanceDue] = useState(0);
    const [accountDueDate, setAccountDueDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBillDetailsSubmission = () => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.createBillingDetails(accountName, balanceDue, accountDueDate)
                .then(response => {
                    setReload(!reload)
                    setAccountName('')
                    setBalanceDue(0)
                    setAccountDueDate('')
                })
                .catch(error => console.log(error));
            setIsLoading(false);
        }, 500)
    }

    const buttonStyles = { margin:5, backgroundColor:'#52ab98', borderColor:'#52ab98', fontWeight:500 };
    const cancelButtonStyles = { backgroundColor:'#c8d8e4', borderColor: '#c8d8e4', fontWeight:500, color:'#676565' }

    return (
        <div>
            <Button style={buttonStyles}  onClick={handleShow}>
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

                        <Form.Group className="mb-3" controlId="formGridAccountBalance">
                            <Form.Label>Account balance</Form.Label>
                            <Form.Control value={balanceDue} onChange={(e) => setBalanceDue(e.target.value)} type="number" step="0.01" placeholder="Account balance" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAccountBalance">
                            <Form.Label>Account Due Date</Form.Label>
                            <Form.Control value={accountDueDate} onChange={(e) => setAccountDueDate(e.target.value)} type="date" placeholder="yyyy-mm-dd" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={cancelButtonStyles} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button style={buttonStyles} onClick={handleBillDetailsSubmission}>
                        { isLoading ? <SpinnerCircle size='sm' /> : 'Add' }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AccountFormModal;