import React, { useState, useEffect } from 'react';
import './dashboard-tabs-metrics.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Pie, Doughnut } from 'react-chartjs-2'
import AuthService from '../../../../../services/authService'
import SpinnerLoader from '../../../../../components/SpinnerLoader'
import BoxContainer from '../../../../../components/BoxContainer'
import AverageChart from '../../../../../components/AverageChart'
import DashboardAPI from '../../../../../api/dashboard.api'

// options configs
const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Account Balances'
    },
    tooltip: {
      callbacks: {
        label: function (context, value) {
          var label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.x !== null) {
            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
          }
          return label;
        }
      }
    }
  },
}

const balanceVsPaidChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Balance Vs. Paid'
    },
    tooltip: {
      callbacks: {
        label: function (context, value) {
          var label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.x !== null) {
            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
          }
          return label;
        }
      }
    }
  },
}

const averageChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Average Payments'
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          var label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += (context.parsed.y === 0) ? 'No Payment' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Last 6 months'
      },
    },
    y: {
      title: {
        display: true,
        text: 'Amount paid'
      },
    }
  },
};

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
    (isLoading)
      ? <SpinnerLoader />
      : <div>
        <Container>
          <h2 style={{ textAlign: 'center', padding: "20px 10px" }}> Metrics </h2>
          <Row>
            <Col className="" xs={12} md={6}>
              <Row>
                <Col className="metric__column" xs={12} md={12}>
                  <BoxContainer style={{ height: 400, maxHeight: 375 }}>
                    <AverageChart data={data.averageChart} options={averageChartOptions} />
                  </BoxContainer>
                </Col>
                <Col className="metric__column" xs={12} md={12}>
                  <BoxContainer>
                    <Doughnut data={data.remainingPayments} options={balanceVsPaidChartOptions} />
                  </BoxContainer>
                </Col>
              </Row>
            </Col>
            <Col className="metric__column" xs={12} md={6}>
              <BoxContainer>
                <Pie data={data.default} options={chartOptions} />
              </BoxContainer>
            </Col>
          </Row>
        </ Container>
      </div>
  );
}

export default MetricsTabContent;
