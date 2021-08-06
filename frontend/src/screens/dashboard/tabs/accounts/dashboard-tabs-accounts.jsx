import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'
import { Container, Table } from 'react-bootstrap'
import AccountFormModal from '../../../../components/AccountFormModal'
import DashboardAPI from '../../../../api/dashboard.api'
import SpinnerLoader from '../../../../components/SpinnerLoader'

function AccountsTabContent(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getUserAccounts('fakeid')
                .then(response => setData(response.data.data))
                .catch(err => console.log(err))
            setIsLoading(false);
        }, 500)
    }, [reload])

    return (
        <Container>
            {
                (isLoading)
                    ? <SpinnerLoader />
                    : <AccountTable data={data} setReload={setReload} reload={reload} />
            }
            <AccountFormModal setReload={setReload} reload={reload} />
        </Container>
    );
}


const AccountTable = ({ data, reload, setReload }) => {
    return (
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
                            <AccountRow key={key} item={item} setReload={setReload} reload={reload} />
                        )
                    })
                }
            </tbody>
        </Table>
    )
}


const AccountRow = ({ item, reload, setReload }) => {
    // Stores the id related to the account 
    const id = item._id;

    const handleAccountDeletion = () => {
        DashboardAPI.deleteBillingAccount(id)
            .then(response => {
                setReload(!reload)
            })
            .catch(err => console.log(err))
    }

    return (
        <tr>
            <td>1</td>
            <td>{item.name}</td>
            <td>{item.accountName}</td>
            <td>${item.balance}</td>
            <td>{item.lastPayment}</td>
            <td>
                <FaTrashAlt onClick={handleAccountDeletion} />
            </td>
        </tr>
    );
}

export default AccountsTabContent;