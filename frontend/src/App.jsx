import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import AuthService from './services/authService'
import ProtectedRoute from './components/ProtectedRoute'
import HomeScreen from './screens/home/HomeScreen'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/register/RegisterScreen";
import LogoutButton from './components/LogoutButton';

function App(props) {
  const [isAuth, setIsAuth] = useState(AuthService.isAuthenticated())
  return (
    <>
      <Router>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">trkr</Navbar.Brand>
            <Nav className="me-auto">
              {
                isAuth
                  ? (<>
                    <Nav.Link className="nav__link" as={Link} to="/">Home</Nav.Link>
                    <Nav.Link className="nav__link" as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <LogoutButton />
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
          <Route path="/logout" render={() => {
            AuthService.logout()
            return <Redirect to={{ pathname: "/login" }} />
          }} />
          <ProtectedRoute path="/dashboard" component={DashboardScreen}></ProtectedRoute>
        </Switch>
      </Router >
    </>
  );
}

export default App;
