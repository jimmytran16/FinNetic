import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import AccountFormModal from '../../../../components/AccountFormModal'
import dashboardAPI from '../../../../api/dashboard.api'
import SpinnerLoader from '../../../../components/SpinnerLoader'
import AccountTable from '../../../../components/AccountTable'

function AccountsTabContent(props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            dashboardAPI.getUserAccounts()
                .then(response => setData(response.data.data))
                .catch(err => console.log(err))
            setIsLoading(false)
        }, 1000)
    }, [reload])

    return (
        <Container>
            {
                (isLoading)
                    ? <SpinnerLoader />
                    : <AccountTable data={data} setReload={setReload} reload={reload} />
            }
            <AccountFormModal />
        </Container>
    );
}

export default AccountsTabContent;