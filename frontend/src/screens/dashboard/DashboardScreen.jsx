import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import MetricsTabContent from './tabs/metrics/dashboard-tabs-metrics'
import AccountsTabContent from './tabs/accounts/dashboard-tabs-accounts'
import PaymentsTabContent from './tabs/payments/dashboard-tabs-payments'

function Dashboard(props) {

    const [key, setKey] = useState('home');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="home" title="Metrics">
                <MetricsTabContent />
            </Tab>
            <Tab eventKey="profile" title="Accounts">
                <AccountsTabContent />
            </Tab>
            <Tab eventKey="contact" title="Payments">
                <PaymentsTabContent />
            </Tab>
        </Tabs>
    );
}

export default Dashboard;