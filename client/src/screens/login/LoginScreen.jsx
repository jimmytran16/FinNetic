import React, { useState } from 'react'
import './LoginScreen.css'
import { Container, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import SpinnerCircle from '../../components/SpinnerCircle'
import AlertMessage from '../../components/AlertMessage'
import AuthAPI from '../../api/auth.api'
import AuthService from '../../services/authService'
import { useHistory } from 'react-router-dom'
import BoxContainer from '../../components/BoxContainer'

const LoginScreen = (props) => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [alertProps, setAlertProps] = useState({
        variant: '',
        heading: '',
        message: ''
    })

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === '' || password === '') return;
        setIsLoading(true);
        setTimeout(() => {
            AuthAPI.loginUser(username, password)
                .then(response => {
                    if (response.data.success) {
                        AuthService.authenticateUser(response.data.data);
                        history.push('/dashboard/open-accounts')
                    }
                    else {
                        setShow(true)
                        setAlertProps({
                            variant: 'danger',
                            heading: response.data.data,
                            message: "Please check your credentials"
                        })
                    }
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        }, 1000)
    }

    const handleDemoLogin = () => {
        setUsername('testing@gmail.com');
        setPassword('testing');
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Log into a demo account with pre-existing data
        </Tooltip>
    );

    return (
        <>
            <Container className="login__screen__wrapper">
                <BoxContainer>
                    <AlertMessage variant={alertProps.variant} heading={alertProps.heading} message={alertProps.message} show={show} setShow={setShow} />
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        </Form.Group>
                        <Button className="login__button" type="submit" onClick={handleLogin}>
                            {(isLoading) ? <SpinnerCircle size={'sm'} /> : 'Log in'}
                        </Button>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                        >
                            <Button onClick={handleDemoLogin} className="demo__button">Demo Account</Button>
                        </OverlayTrigger>
                    </Form>
                </BoxContainer>
            </Container>
        </>
    )
}

export default LoginScreen;
