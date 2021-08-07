import { Alert } from 'react-bootstrap'

function AlertMessage({ heading, variant, message, setShow }) {
    return (
        <Alert variant={ variant } onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{ heading }</Alert.Heading>
            <p>
                { message }
            </p>
        </Alert>
    );
}

export default AlertMessage;