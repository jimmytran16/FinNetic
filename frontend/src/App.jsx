import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap'
import HomeScreen from './screens/home/HomeScreen'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import LoginScreen from "./screens/login/LoginScreen";


function App() {
  return (
    <>
      <Router>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">Tracker</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/login">Log in</Nav.Link>
              <Nav.Link href="/login">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={HomeScreen}></Route>
          <Route path="/dashboard" component={DashboardScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
        </Switch>
      </Router >
    </>
  );
}

export default App;
