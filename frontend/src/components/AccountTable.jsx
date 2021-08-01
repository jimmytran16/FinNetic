import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'
import { Table } from 'react-bootstrap'
import dashboardAPI from '../api/dashboard.api'

function AccountTable({ data, reload, setReload }) {
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


function AccountRow({ item, reload, setReload }) {
    // Stores the id related to the account 
    const id = item._id;

    const handleAccountDeletion = () => {
        dashboardAPI.deleteBillingAccount(id)
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

export default AccountTable;