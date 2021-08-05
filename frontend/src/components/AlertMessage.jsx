import { Alert } from 'react-bootstrap'

function AlertMessage({ heading, message, setShow }) {
    return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{ heading }</Alert.Heading>
            <p>
                { message }
            </p>
        </Alert>
    );
}

export default AlertMessage;