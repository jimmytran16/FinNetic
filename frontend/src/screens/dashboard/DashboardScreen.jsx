import React from 'react';
import './DashboardScreen.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import OpenAccountsPage from './dashboard-open-accounts/dashboard-open-accounts'
import DashboardBudgetPage from './dashboard-budgeting/dashboard-bugeting'
import { Container, Tab, Col, Row, Nav } from 'react-bootstrap';

function Dashboard() {
    return (
        <>
            <Container className="dashboard__nav__wrapper">
                <Router>
                    <div className="tab__container__wrapper">
                        <h4> Dashboard </h4>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={2}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link className="dashboard__tab" as={Link} to="/dashboard/open-accounts" eventKey="first">Accounts</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className="dashboard__tab" as={Link} to="/dashboard/budgeting" eventKey="second">Budgeting</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={10}>

                                    <Tab.Content>
                                        <Switch>
                                            <Route path="/dashboard/budgeting">
                                                <DashboardBudgetPage />
                                            </Route>
                                            <Route path="/dashboard/open-accounts">
                                                <OpenAccountsPage />
                                            </Route>
                                        </Switch>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </Router>
            </Container>
        </>
    );
}

export default Dashboard;
