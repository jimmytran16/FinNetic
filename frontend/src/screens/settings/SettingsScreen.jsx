import React, { useEffect, useState } from 'react'
import './SettingsScreen.css'
import { Button, Tab, Col, Row, Nav, Container, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Switch from "react-switch";
import SettingAPI from '../../api/setting.api'
import SpinnerCircle from '../../components/SpinnerCircle';
import AlertMessage from '../../components/AlertMessage';
import BoxContainer from '../../components/BoxContainer';


const SettingsScreen = (props) => {

    return (
        <Container style={{ paddingTop: 20 }}>
            <h4> Settings </h4>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col className="setting__tab__col" sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link className="settings" eventKey="first">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="settings" eventKey="second">Notification</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="settings__tab__content">
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
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        SettingAPI.getUserInfo()
            .then(response => {
                if (response.data.success) {
                    setData(response.data.data);
                    console.log(response.data.data.phone)
                    setPhoneNumber(response.data.data.phone)
                }
            })
            .catch(err => console.log(err));
    }, [refresh])

    const handleUpdate = () => {
        setIsLoading(true)
        setTimeout(() => {
            SettingAPI.updateUser(phoneNumber)
                .then(response => {
                    if (response.data.success) setRefresh(!refresh);
                    setIsLoading(false)
                })
                .catch(err => console.log(err));
        }, 500)
    }

    return (
        <>
            <BoxContainer>
                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label className="settings__form__label">Full name</Form.Label>
                        <Form.Control type="text" placeholder="name" defaultValue={data.name} disabled />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label className="settings__form__label">Email</Form.Label>
                        <Form.Control type="email" placeholder="email" defaultValue={data.username} disabled />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label className="settings__form__label">Account creation</Form.Label>
                        <Form.Control type="text" placeholder="Account creation" defaultValue={data.createdOn} disabled />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label className="settings__form__label">Phone number</Form.Label>
                        <Form.Control type="phone" placeholder="Add phone number" defaultValue={data.phone ?? ''} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </Form.Group>
                    <div className="settings__button__container">
                        <Button onClick={handleUpdate}> {isLoading ? <SpinnerCircle size={'sm'} /> : 'Update'}</Button>
                    </div>
                </Form>
            </BoxContainer>
        </>
    )
}

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Get a payment reminder for this account
    </Tooltip>
);

const ScheduleTabContent = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        SettingAPI.getUserAccounts()
            .then(response => {
                if (response.data.success) setData(response.data.data);
                else setShowError(true);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <BoxContainer>
                {/* NEED TO CLEAN UP */}
                <div>
                    <AlertMessage variant={'danger'} message={'Error updating'} show={show} setShow={setShow} />
                </div>
                <div>
                    <AlertMessage variant={'warning'} message={'Error loading from Reminder Server'} show={showError} setShow={setShowError} />
                </div>
                <Row style={{ padding: 10 }}>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <strong>Accounts</strong>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <strong>
                            Notify
                        </strong>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}>
                            <span> ⓘ</span>
                        </OverlayTrigger>
                    </Col>
                </Row>

                <Row style={{ padding: 10 }}>
                    {
                        data.map((item, key) => {
                            return (
                                <Col key={key} lg={12}>
                                    <ReminderSwitch key={key} item={item} setShow={setShow} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </BoxContainer>
        </>
    )
}

const ReminderSwitch = ({ item, setShow, show }) => {
    const [checked, setChecked] = useState(item.sendReminder ?? false)
    const [isLoading, setIsLoading] = useState(false);

    const accountId = item.accountId
    const handleChange = () => {
        const sendReminder = !checked;

        setIsLoading(true)
        setTimeout(() => {
            SettingAPI.updateAccountSendReminder(accountId, sendReminder)
                .then(response => {
                    // if the update is a success then set toggle the switch
                    if (response.data.success) setChecked(!checked);
                    // show an error message w/ issue if it is not a success response
                    else setShow(true);
                    setIsLoading(false)
                })
                .catch(err => console.log(err));
        }, 500)
    }
    return (
        <>
            {
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <label>
                            <span>{item.accountName}</span>
                        </label>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        {isLoading
                            ? <SpinnerCircle size={'sm'} variant={'dark'} />
                            : <Switch height={20} width={40} onColor={'#52ab98'} onChange={handleChange} checked={checked} />
                        }
                    </Col>
                </Row>
            }
        </>
    )
}

export default SettingsScreen;
