import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Nav, ButtonGroup, Button, Container, Dropdown } from 'react-bootstrap'
import { FiSettings } from 'react-icons/fi'
import AuthService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import HomeScreen from './screens/home/HomeScreen'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/register/RegisterScreen";
import SettingsScreen from './screens/settings/SettingsScreen';

function App() {
  return (
    <>
      <Router>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">trkr</Navbar.Brand>
            <Nav className="me-auto">
              {
                AuthService.isAuthenticated()
                  ? (<>
                    <Nav.Link className="nav__link" as={Link} to="/">Home</Nav.Link>
                    <Nav.Link className="nav__link" as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Dropdown as={ButtonGroup}>
                      <Button href="/settings" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                        <FiSettings color={'#52ab98'} />
                      </Button>
                      <Dropdown.Toggle style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#52ab98', padding: 0, margin: 0 }} split variant="success" id="dropdown-split-basic" />

                      <Dropdown.Menu alignRight={true}>
                        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>)
                  : (<>
                    <Nav.Link className="nav__link login" as={Link} to="/login">Login </Nav.Link>
                    <Nav.Link className="nav__link register" as={Link} to="/register">
                      <Button>Register</Button>
                    </Nav.Link>
                  </>)
              }
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/logout" render={() => { return AuthService.logout() }} />
          <ProtectedRoute path="/dashboard" component={DashboardScreen}></ProtectedRoute>
          <ProtectedRoute path="/settings" component={SettingsScreen}></ProtectedRoute>
          <Route component={My404Component} />
        </Switch>
      </Router>
    </>
  );
}

const My404Component = () => {
  return (
    <h3>Route not found</h3>
  )
}
export default App;
