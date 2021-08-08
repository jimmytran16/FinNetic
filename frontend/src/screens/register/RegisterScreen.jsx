import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import AlertMessage from '../../components/AlertMessage'
import AuthAPI from '../../api/auth.api'
import SpinnerCircle from '../../components/SpinnerCircle'

const RegisterScreen = (props) => {
    let history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [show, setShow] = useState(false);

    const handleRegistration = () => {
        setIsLoading(true)
        setTimeout(() => {
            AuthAPI.registerUser(email, password, name)
                .then(response => {
                    if (response.data.success) {
                        history.push('/login')
                    } else {
                        setShow(true)
                    }
                })
                .catch(err => console.log(err))
            setIsLoading(false)
        }, 500)
    }

    return (
        <>
            <Container>
                <AlertMessage heading="Email Already Registered!" variant="danger" message="Please use a different user email." setShow={setShow} show={show} />
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" onClick={handleRegistration}>
                        {(isLoading) ? <SpinnerCircle size={'sm'} /> : 'Register'}
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default RegisterScreen;