import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap'
import DashboardAPI from '../../../../../api/dashboard.api'
import BoxContainer  from '../../../../../components/BoxContainer'

function PaymentsTabContent(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        DashboardAPI.getUserPayments()
            .then(response => setData(response.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
          <BoxContainer>
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
                        data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>1</td>
                                    <td >{item.name}</td>
                                    <td >{item.accountName}</td>
                                    <td >${item.amountPaid}</td>
                                    <td >{item.paymentDate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
          </BoxContainer>
        </Container>
    );
}

export default PaymentsTabContent;
