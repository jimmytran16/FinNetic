import React, { useEffect, useState } from 'react'
import './SettingsScreen.css'
import { Button, Tab, Col, Row, Nav, Container, Form } from 'react-bootstrap'
import SettingAPI from '../../api/setting.api'
import Switch from "react-switch";


const SettingsScreen = (props) => {
    return (
        <Container style={{ paddingTop:20 }}>
            <h4> Settings </h4>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link className="settings" eventKey="first">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="settings" eventKey="second">Scheduler</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <ProfileTabContent />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ScheduleTabContent />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

const ProfileTabContent = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        SettingAPI.getUserInfo()
            .then(response => setData(response.data.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control type="text" placeholder="name" value={data?.name} disabled />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" value={data?.username} disabled />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Account creation</Form.Label>
                    <Form.Control type="email" placeholder="email" value={data?.createdOn} disabled />
                </Form.Group>
                <div className="settings__button__container">
                    <Button>Update</Button>
                </div>
            </Form>
        </>
    )
}

const ScheduleTabContent = () => {
    const [checked, setChecked] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        SettingAPI.getUserAccounts()
            .then(response => setData(response.data.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <Row style={{ padding:10 }}>
                <Col xs={8} sm={8} md={8} lg={8}>
                    <strong>Account name</strong>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                    <strong>Remind</strong>
                </Col>
            </Row>

            <Row style={{ padding:10 }}>
                {
                    data.map((item, key) => {
                        return (
                            <Col lg={12}>
                                <ReminderSwitch key={key} item={item} />
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

const ReminderSwitch = ({ item }) => {
    const [checked, setChecked] = useState(item.sendReminder ?? false)
    const [accountId, setAccountId] = useState(item.accountId);

    const handleChange = () => {
        setChecked(!checked);
        console.log('status', checked)
        console.log('account name', item.accountName)
    }
    return (
        <>
            <Row>
                <Col xs={8} sm={8} md={8} lg={8}>
                    <label>
                        <span>{item.accountName}</span>
                    </label>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                    <Switch height={20} width={40} onColor={'#52ab98'} onChange={handleChange} checked={checked} />
                </Col>
            </Row>
        </>
    )
}

export default SettingsScreen;
