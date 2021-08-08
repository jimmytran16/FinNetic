import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import SpinnerCircle from '../../components/SpinnerCircle'
import AlertMessage from '../../components/AlertMessage'
import AuthAPI from '../../api/auth.api'

const LoginScreen = (props) => {
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
        setIsLoading(true);
        setTimeout(() => {
            AuthAPI.loginUser(username, password)
                .then(response => {
                    if (response.data.success) {
                        // NEED TO STORE THE TOKEN AND DATA WHEN IT IS SUCCESSFUL
                        setShow(true)
                        setAlertProps({
                            variant: 'success',
                            heading: 'Sucessful log in (testing)',
                            message: JSON.stringify(response.data.data)
                        })
                    }
                    else {
                        setShow(true)
                        setAlertProps({
                            variant: 'danger',
                            heading: response.data.data,
                            message: "Please check your credentials"
                        })
                    }
                })
                .catch(err => console.log(err));
            setIsLoading(false);
        }, 1000)
    }

    return (
        <>
            <Container>
                <AlertMessage variant={alertProps.variant} heading={alertProps.heading} message={alertProps.message} show={show} setShow={setShow} />
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onChange={(e) => setUsername(e.target.value)} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        {(isLoading) ? <SpinnerCircle size={'sm'} /> : 'Log in'}
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default LoginScreen;