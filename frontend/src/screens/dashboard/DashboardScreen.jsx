import React from 'react';
import './DashboardScreen.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import OpenAccountsPage from './dashboard-open-accounts/dashboard-open-accounts'
import { Container } from 'react-bootstrap';

function Dashboard({ history }) {
    return (
        <>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/dashboard">Dash</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/openAccounts">Open Accounts</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/budgeting">Bugeting</Link>
                            </li>
                        </ul>
                    </nav>

                    <Container>
                        <Switch>
                            <Route path="/dashboard/budgeting">
                                <BugetingContent />
                            </Route>
                            <Route path="/dashboard/openAccounts">
                                <OpenAccountsPage />
                            </Route>
                            <Route path="/dashboard">
                                <DashContent />
                            </Route>
                        </Switch>
                    </Container>
                </div>
            </Router>
        </>
    );
}

const DashContent = () => {
    return (
        <h1>Hello from Dash</h1>
    )
}

const BugetingContent = () => {
    return (
        <h1>Bugetting Component</h1>
    )
}


export default Dashboard;
