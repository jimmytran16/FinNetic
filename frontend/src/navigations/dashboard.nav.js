import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'

function DashboardNav(props) {
    return (
        <div>
            <>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="#home">BRAND</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Sign In</Nav.Link>
                            <Nav.Link href="#pricing">Register</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        </div>
    );
}

export default DashboardNav;