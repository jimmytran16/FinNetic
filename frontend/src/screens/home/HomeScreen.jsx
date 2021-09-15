import React from 'react';
import './HomeScreen.css'
import { Button, Card } from 'react-bootstrap'
import AuthService from '../../services/authService'

function HomeScreen({history}) {
    return (
        <>
            <header>
                <Card style={{ height: '80vh', border: 0, borderRadius: 0, background: 'url("/header.jpeg")' }}>
                    <Card.Body style={{ padding: 0 }}>
                        <div style={{ position: 'absolute', bottom: 0, margin: 20 }}>
                            <div className="slogan__wrapper">
                                <h1>
                                    Your financial future strategized today.
                                </h1>
                                <h6>
                                    Budget your money with Trkr
                                </h6>
                            </div>
                            <Button className="home__register__button" variant="primary" onClick={() => history.push(AuthService.isAuthenticated() ? '/dashboard' : '/register')}>Create an account</Button>
                        </div>
                    </Card.Body>
                </Card>
            </header>
        </>
    );
}

export default HomeScreen;