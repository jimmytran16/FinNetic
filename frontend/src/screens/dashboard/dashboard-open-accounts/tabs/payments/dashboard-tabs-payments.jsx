import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Container, Table } from 'react-bootstrap'
import { PaymentUtil, FormatUtil } from '../../../../../utils/index'
import SpinnerLoader from '../../../../../components/SpinnerLoader';
import DashboardAPI from '../../../../../api/dashboard.api'

function PaymentsTabContent(props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getUserPayments()
                .then(response => setData(response.data.data))
                .catch(err => console.log(err))
            setIsLoading(false)
        }, 500)
    }, [])

    return (
        (isLoading)
            ? <SpinnerLoader />
            : <Container>
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
                                                                <td >{FormatUtil.currencyFormat(item.amountPaid)}</td>
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
