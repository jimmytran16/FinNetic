import React, { useEffect, useState } from 'react';
import './dashboard-tabs-accounts.css';
import { FaTrashAlt, FaMoneyCheck } from 'react-icons/fa'
import { Container, Table } from 'react-bootstrap'
import AccountFormModal from '../../../../components/AccountFormModal'
import PaymentFormModal from '../../../../components/PaymentFormModal'
import DashboardAPI from '../../../../api/dashboard.api'
import SpinnerLoader from '../../../../components/SpinnerLoader'

function AccountsTabContent(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getUserAccounts()
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
    const [show, setShow] = useState(false)
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
            <td className="action__icons__wrapper">
                <div className="action__icons">
                    <FaTrashAlt className="delete__icon" onClick={handleAccountDeletion} />
                </div>
                <div className="action__icons">
                    <FaMoneyCheck className="payment__icon" onClick={() => setShow(!show)} />
                </div>
            </td>
            <PaymentFormModal show={show} accountName={item.name} setShow={setShow} />
        </tr>
    );
}

export default AccountsTabContent;