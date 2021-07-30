import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
import HomeScreen from './screens/home/HomeScreen'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/register/RegisterScreen";

function App() {

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">trkr</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/login">Login </Nav.Link>
            <Nav.Link href="/register">Register </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route path="/dashboard" component={DashboardScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
        </Switch>
      </Router >
    </>
  );
}

export default App;
