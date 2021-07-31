import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap'
import BillForm from '../../../../components/BillForm'
import { FaTrashAlt } from 'react-icons/fa'
import dashboardAPI from '../../../../api/dashboard.api'

function AccountsTabContent(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        dashboardAPI.getUserAccounts()
            .then(response => setData(response.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Account holder</th>
                        <th>Balance</th>
                        <th>Last Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, key) => {
                            return (
                                <tr key ={key}>
                                    <td>{key}</td>
                                    <td>{item.name}</td>
                                    <td>{item.accountName}</td>
                                    <td>${item.balance}</td>
                                    <td>{item.lastPayment}</td>
                                    <td>
                                        <FaTrashAlt />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div>
                <BillForm />
            </div>
        </Container>
    );
}

export default AccountsTabContent;