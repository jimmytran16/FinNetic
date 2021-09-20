import React from 'react';
import './HomeScreen.css'
import { Button, Card, Image, Row, Col } from 'react-bootstrap'
import { FaRegBell, FaMoneyBill } from 'react-icons/fa'
import AuthService from '../../services/authService'

function HomeScreen({ history }) {
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
                            <Button className="home__register__button" variant="primary" onClick={() => history.push(AuthService.isAuthenticated() ? '/dashboard/open-accounts' : '/register')}>Create an account</Button>
                        </div>
                    </Card.Body>
                </Card>
            </header>
            <header>
                <Card className="header__card__1">
                    <Card.Body className="header__cardbody" style={{ padding: 0 }}>
                        <Row className="home___banner__1" style={{ height:'100%', width:'100%' }}>
                            <Col style={{ display:'flex', alignItems:'center', justifyContent:'center' }} sm={12} md={6}>
                                <div >
                                    <FaRegBell className="notification__icon"/>
                                </div>
                            </Col>
                            <Col style={{ display:'flex', alignItems:'center', justifyContent:'center' }} sm={12} md={6}>
                                <div >
                                    <h2>Have your account payments notified.</h2>
                                    <h6>
                                        Straight to your phone.
                                    </h6>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </header>
            <header>
                <Image className="home___banner__2" src="/banner-final.jpg" fluid />
            </header>
            <header>
                <Card className="header__card__2">
                    <Card.Body className="header__cardbody" style={{ padding: 0 }}>
                        <Row className="home___banner__1" style={{ height:'100%', width:'100%' }}>
                        <Col style={{ display:'flex', alignItems:'center', justifyContent:'center' }} sm={12} md={6}>
                                <div >
                                    <h2>Keep track of your finances.</h2>
                                    <h6>
                                        At the tip of your fingers.
                                    </h6>
                                </div>
                            </Col>
                            <Col style={{ display:'flex', alignItems:'center', justifyContent:'center' }} sm={12} md={6}>
                                <div >
                                    <FaMoneyBill className="money__icon"/>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </header>
            <footer> &copy; FinNetic 2021 - Jimmy Tran </footer>
        </>
    );
}

export default HomeScreen;