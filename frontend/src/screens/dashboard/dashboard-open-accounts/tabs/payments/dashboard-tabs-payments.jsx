import React, { useEffect, useState } from 'react';
import './dashboard-tabs-payments.css'
import { Accordion, Button, Card, Container, Table } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa';
import { PaymentUtil, FormatUtil } from '../../../../../utils/index'
import SpinnerLoader from '../../../../../components/SpinnerLoader';
import DashboardAPI from '../../../../../api/dashboard.api'

function PaymentsTabContent(props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getUserPayments()
                .then(response => {
                    setData(response.data.data)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        }, 500)
    }, [reload])

    const handlePaymentDeletion = (id) => {
        console.log(id)
        DashboardAPI.deleteAccountPayment(id)
            .then(response => {
                console.log(response.data)
                if (response.data.success) setReload(!reload);
            })
            .catch(err => console.log(err))
    }

    return (
        (isLoading)
            ? <SpinnerLoader />
            : <Container>
                <h2 style={{ textAlign: 'center', padding: "20px 10px" }}> Payments </h2>
                {(data.length == 0) && <h6 style={{ textAlign: 'center' }}>No Payments Yet</h6>}
                <Accordion defaultActiveKey="1">
                    {
                        data.map((item, key) => {
                            return (
                                <Card key={key}>
                                    <Card.Header className="card__header">
                                        <Accordion.Toggle as={Button} className="accordion__toggle__button" eventKey={key + 1}>
                                            {item.month}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={key + 1}>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Account Name</th>
                                                    <th>Amount Paid</th>
                                                    <th>Payment Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.payments.map((item, key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <td>{++key}</td>
                                                                <td >{item.name}</td>
                                                                <td >{item.accountName}</td>
                                                                <td >{FormatUtil.currencyFormat(item.amountPaid)}</td>
                                                                <td >{PaymentUtil.parseOffsetDateToMonthDayYear(item.paymentDate)}</td>
                                                                <td >
                                                                    <Button className="delete__button" onClick={() => handlePaymentDeletion(item._id)}>
                                                                        <FaTrashAlt />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })
                    }
                </Accordion>
            </Container>
    );
}

export default PaymentsTabContent;
