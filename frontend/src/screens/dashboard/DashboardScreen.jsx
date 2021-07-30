import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import SpinnerLoader from '../../components/SpinnerLoader'
import BillForm from '../../components/BillForm';
import dashboardApi from '../../api/dashboard.api';

function Dashboard(props) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            dashboardApi.getDashboardGridContent()
                .then(response => {
                    setData(response.data.data)
                    setIsLoading(false);
                })
                .catch(error => console.log(error))
        }, 500)
    }, [])

    return (
        (!isLoading)
            ? <div>
                <Container>
                    <BillForm />
                    <h2 style={{ textAlign: 'center', padding: "20px 10px" }}> Balance Charts </h2>
                    <Row>
                        <Col xs={12} md={6}>
                            <Container>
                                <Bar data={data} />
                            </Container>
                        </Col>
                        <Col xs={12} md={6}>
                            <Container>
                                <Pie data={data} />
                            </Container>
                        </Col>
                    </Row>

                </ Container>
            </div>
            : <SpinnerLoader />
    );
}

export default Dashboard;