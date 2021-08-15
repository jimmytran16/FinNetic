import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import SpinnerCircle from './SpinnerCircle'
import DashboardAPI from '../api/dashboard.api';


function PaymentFormModal({ accountId, accountName, show, setShow }) {

    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleClose = () => setShow(false);

    const handlePaymentSubmission = () => {
        setIsLoading(true)
        setTimeout(() => {
            DashboardAPI.createUserPayment(accountId, accountName, paymentAmount, paymentDate)
            .then(response => {
                setPaymentAmount('')
                setPaymentDate('')
                setShow(false)
            })
            .catch(err => console.log(err))
            setIsLoading(false)
        },500)

    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{accountName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Amount Paid</Form.Label>
                            <Form.Control type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Amount Paid" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridHolderName">
                            <Form.Label>Payment Date</Form.Label>
                            <Form.Control type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} placeholder="Payment Date" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handlePaymentSubmission}>
                        { isLoading ? <SpinnerCircle size='sm' /> : 'Add Payment' }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PaymentFormModal;
