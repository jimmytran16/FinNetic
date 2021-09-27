import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { FaUserEdit } from 'react-icons/fa'
import SpinnerCircle from '../../../../../../components/SpinnerCircle'
import DashboardAPI from '../../../../../../api/dashboard.api'

const allPossibleDueDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const AccountModifyModal = ({ item, setReload, reload }) => {

    const accountId = item._id;
    const accountDueDay = item.accountDueDay;
    const accountName = item.name;
    const accountHolderName = item.accountName;

    const [balanceDue, setBalanceDue] = useState(item.balance);
    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buttonStyles = { margin: 5, backgroundColor: '#52ab98', borderColor: '#52ab98', fontWeight: 500 };
    const cancelButtonStyles = { backgroundColor: '#c8d8e4', borderColor: '#c8d8e4', fontWeight: 500, color: '#676565' }

    const handleAccountUpdate = () => {
        setIsLoading(true)
        setTimeout(() => {
            const filter = { _id: accountId };
            const update = { balance: balanceDue };

            DashboardAPI.updateAccount(filter, update)
                .then(response => {
                    setIsLoading(false)
                    setReload(!reload)
                    handleClose();
                })
                .catch(err => console.log(err))
        }, 500)
    }

    return (
        <>
            <Button onClick={handleShow} style={buttonStyles}>
                <FaUserEdit />
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Editing <i>{accountName}</i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control disabled={true} value={accountName} placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridName">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control disabled={true} value={accountHolderName} placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAccountBalance">
                            <Form.Label>Account balance</Form.Label>
                            <Form.Control value={balanceDue} onChange={(e) => setBalanceDue(e.target.value)} type="number" step="0.01" placeholder="Account balance" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAccountBalance">
                            <Form.Label>Account Due Day</Form.Label>
                            <Form.Control disabled={true} value={accountDueDay} as="select" aria-label="Default select example">
                                <option>Choose Due Day</option>
                                {
                                    allPossibleDueDays.map((item, key) => {
                                        return (
                                            <option key={key}>{item}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={cancelButtonStyles} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button style={buttonStyles} onClick={handleAccountUpdate}>
                        {isLoading ? <SpinnerCircle size='sm' /> : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AccountModifyModal;