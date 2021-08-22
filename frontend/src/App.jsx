import React , { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
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
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              {
                isAuth
                ? (<LogoutButton />)
                :(<>
                <Nav.Link as={Link} to="/login">Login </Nav.Link>
                <Nav.Link as={Link} to="/register">Register </Nav.Link>
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
