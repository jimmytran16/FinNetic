import React, { useEffect, useState } from 'react';
import SpinnerLoader from '../../components/SpinnerLoader'
import { getGridData } from '../../api/getGridData'
import { Bar } from 'react-chartjs-2';
import { Form, Button, Container, Spinner } from 'react-bootstrap';

function Dashboard(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            getGridData()
            .then(response => {
                setData(response.data.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
        }, 500)
    }, [])

    return (
        (!isLoading)
            ? <div>
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Bill Name</Form.Label>
                            <Form.Control type="text" placeholder="Type in company name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Billing Due</Form.Label>
                            <Form.Control type="date" placeholder="Type in date bill is due" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                    <h2> Table : </h2>
                    <Bar data={data} />
                </ Container>
            </div>
            : <SpinnerLoader />

    );
}

export default Dashboard;