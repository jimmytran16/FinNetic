import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Container, Table } from 'react-bootstrap'
import DashboardAPI from '../../../../../api/dashboard.api'
import PaymentUtil from '../../../../../utils/payment.utils'

function PaymentsTabContent(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        DashboardAPI.getUserPayments()
            .then(response => setData(response.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Accordion defaultActiveKey="1">
                {
                    data.map((item, key) => {
                        return (
                            <Card key={key}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={key + 1}>
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
                                                            <td >${item.amountPaid}</td>
                                                            <td >{PaymentUtil.parseOffsetDateToMonthDayYear(item.paymentDate)}</td>
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
