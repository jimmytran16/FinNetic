import React, { useState } from 'react';
import { Form, Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import SpinnerCircle from '../../../../../../components/SpinnerCircle'
import DashboardAPI from '../../../../../../api/dashboard.api';
import FormatUtil from '../../../../../../utils/format.utils'

function PaymentFormModal({ data }) {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [accountId, setAccountId] = useState('');
    const [accountName, setAccountName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAccountPick = (event) => {
        var selectedIndex = event.target.options.selectedIndex;
        var accountId = event.target.options[selectedIndex].getAttribute('data');
        setAccountName(event.target.value)
        setAccountId(accountId);
    }

    const handlePaymentSubmission = () => {
        console.log(paymentDate)
        if (!FormatUtil.isValidDate(paymentDate)) return alert('Please enter correct formatted date!');

        setIsLoading(true)
        setTimeout(() => {
            DashboardAPI.createUserPayment(accountId, accountName, paymentAmount, paymentDate)
                .then(response => {
                    setPaymentAmount('')
                    setPaymentDate('')
                })
                .catch(err => console.log(err))
            setIsLoading(false)
        }, 500)
    }

    const buttonStyles = { margin: 5, backgroundColor: '#2b6777', borderColor: '#2b6777', fontWeight: 500 };
    const cancelButtonStyles = { backgroundColor: '#c8d8e4', borderColor: '#c8d8e4', fontWeight: 500, color: '#676565' }
    return (
        <div>
            <Button disabled={(data.length === 0) ? true : false} style={buttonStyles} onClick={handleShow}>
                Add Payment
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{accountName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Select Account</Form.Label>
                            <Form.Control onChange={handleAccountPick} as="select" aria-label="Default select example">
                                <option>Choose Account</option>
                                {
                                    data.map((item, key) => {
                                        return (
                                            <option data={item._id} key={key}>{item.name}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Amount Paid</Form.Label>
                            <Form.Control type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Amount Paid" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridHolderName">
                            <Form.Label>Payment Date</Form.Label>
                            <Form.Control type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} placeholder="yyyy-mm-dd" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={cancelButtonStyles} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button style={buttonStyles} onClick={handlePaymentSubmission}>
                        {isLoading ? <SpinnerCircle size='sm' /> : 'Add Payment'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PaymentFormModal;
