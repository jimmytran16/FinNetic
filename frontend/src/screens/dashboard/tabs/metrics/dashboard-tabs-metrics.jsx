import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { Pie, Bar } from 'react-chartjs-2'
import SpinnerLoader from '../../../../components/SpinnerLoader'
import DashboardAPI from '../../../../api/dashboard.api'


function MetricsTabContent({ }) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getDashboardGridContent()
                .then(response => setData(response.data.data))
                .catch(err => console.log(err))
            setIsLoading(false);
        }, 500)
    }, [])

    return (
        (!isLoading)
            ? <div>
                <Container>
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

export default MetricsTabContent;