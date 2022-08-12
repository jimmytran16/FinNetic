import React, { useEffect, useState } from 'react';
import './dashboard-tabs-accounts.css';
import { FaTrashAlt } from 'react-icons/fa'
import { Button, Container, Table, Modal } from 'react-bootstrap'
import { PaymentUtil, FormatUtil } from '../../../../../utils/index'
import AccountFormModal from './chlidren/account-form-modal'
import PaymentFormModal from './chlidren/payment-form-modal'
import AccountModifyModal from './chlidren/account-modify-modal'
import SpinnerLoader from '../../../../../components/SpinnerLoader'
import BoxContainer from '../../../../../components/BoxContainer'
import DashboardAPI from '../../../../../api/dashboard.api'

function AccountsTabContent(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getUserAccounts()
                .then(response => {
                    setData(response.data.data)
                    setIsLoading(false);
                })
                .catch(err => console.log(err))
        }, 500)
    }, [reload])

    return (
        <Container>
            {
                (isLoading)
                    ? <SpinnerLoader />
                    : <>
                        <h2 style={{ textAlign: 'center', padding: "20px 10px" }}> Accounts </h2>
                        {(data.length > 0)
                            ? (<>
                                <AccountTable data={data} setReload={setReload} reload={reload} />
                            </>)

                            : <h6 style={{ textAlign: 'center' }}>No Accounts</h6>
                        }
                        <div style={{ display: 'flex' }}>
                            <AccountFormModal setReload={setReload} reload={reload} />
                            <PaymentFormModal data={data} />
                        </div>
                    </>
            }
        </Container>
    );
}


const AccountTable = ({ data, reload, setReload }) => {
    return (
        <BoxContainer>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Account holder</th>
                        <th>Balance</th>
                        <th>Last Payment</th>
                        <th>Payment Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, key) => {
                            return (
                                <AccountRow key={key} item={item} setReload={setReload} reload={reload} rowCount={key + 1} />
                            )
                        })
                    }
                </tbody>
            </Table>
        </BoxContainer>
    )
}


const AccountRow = ({ item, rowCount, reload, setReload }) => {
    // Stores the id related to the account
    const id = item._id;

    return (
        <>
            <tr>
                <td>{rowCount}</td>
                <td>{item.name}</td>
                <td>{item.accountName}</td>
                <td>{FormatUtil.currencyFormat(item.balance)}</td>
                <td>{PaymentUtil.parseOffsetDateToMonthDayYear(item.lastPayment)}</td>
                <td>{PaymentUtil.parseOffsetDateToMonthDayYear(item.accountDueDate)}</td>
                <td className="action__icons__wrapper">
                    <div className="action__icons">
                        <Button className="delete__button">
                            <DeletePromptModal id={id} accountName={item.name} reload={reload} setReload={setReload} />
                        </Button>
                        <AccountModifyModal item={item} reload={reload} setReload={setReload} />
                    </div>
                </td>
            </tr>
        </>
    );
}

const DeletePromptModal = ({ id, accountName, reload, setReload }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAccountDeletion = () => {
        DashboardAPI.deleteBillingAccount(id)
            .then(response => {
                if (response.data.success)
                    setReload(!reload)
                else 
                    alert('Failed to delete account. Please try again later!');
                
                handleClose();
            })
            .catch(err => {
                console.log(err);
                alert('Failed to delete account. Please try again later!');
            })
    }

    return (
        <>
        <div onClick={handleShow}>
            <FaTrashAlt />
        </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the account: <b>{accountName}</b> ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAccountDeletion}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default AccountsTabContent;
