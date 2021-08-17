import React, { useState, useEffect } from 'react';
import './dashboard-tabs-metrics.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Pie, Bar, Doughnut } from 'react-chartjs-2'
import AuthService from '../../../../services/authService'
import SpinnerLoader from '../../../../components/SpinnerLoader'
import BoxContainer from '../../../../components/BoxContainer'
import DashboardAPI from '../../../../api/dashboard.api'


function MetricsTabContent(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            DashboardAPI.getDashboardGridContent()
                .then(response => setData(response.data.data))
                .catch(err => {
                    AuthService.logout()
                })
            setIsLoading(false);
        }, 500)
    }, [])
    return (
        (!isLoading)
            ? <div>
                <Container>
                    <h2 style={{ textAlign: 'center', padding: "20px 10px" }}> Balance Charts </h2>
                    <Row>
                        <Col className="" xs={12} md={6}>
                          <Row>
                            <Col className="metric__column" xs={12} md={12}>
                                <Container>
                                    <BoxContainer title='Bar'>
                                      <Bar data={data} />
                                    </BoxContainer>
                                </Container>
                            </Col>
                            <Col className="metric__column" xs={12} md={12}>
                                <Container>
                                  <BoxContainer title="Doughnut">
                                    <Doughnut data={data} />
                                  </BoxContainer>
                                </Container>
                            </Col>
                          </Row>
                        </Col>
                        <Col className="metric__column" xs={12} md={6}>
                            <Container>
                              <BoxContainer title="Pie">
                                <Pie data={data} />
                              </BoxContainer>
                            </Container>
                        </Col>

                    </Row>

                </ Container>
            </div>
            : <SpinnerLoader />
    );
}

export default MetricsTabContent;
