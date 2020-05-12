import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, Jumbotron, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { registerEvent } from './../../redux/actions/registrationActions';
import axios from "axios";
// import {JobSidebar} from './jobsidebar/JobSidebar';

const Styles = styled.div`
    .job-discription-container{
        margin: 0 auto;
        overflow-y: scroll;
        height: 485px;
    }

    .job-discription-job-title{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 28px;
        font-weight: 620;
        max-height: 75px;
       }
    .job-discription-job-employer{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 16px;
        font-weight: 550;
        min-height: 15px;
        max-height: 25px;
       }
    .job-discription-heading{
        height: 115px;
        overflow-y:scrool;
        padding:5px;
    }
    .job-discription-subheading{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 350;
        min-height: 20px;
        max-height: 20px;
        vertical-align: middle;
        padding: 3px;
    }
    .job-discription-apply-box{
        max-height: 65px;
        overflow-y: scroll;
        margin: 10px;
        padding: 4px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .job-discription-discription-title{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 22px;
        font-weight: 450;
        padding: 10px;
        min-height: 40px;
        max-height: 60px;
        vertical-align: middle;
    }
    .job-discription-discription{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 50;
        overflow-y:scrool;
        padding: 10px;
        min-height: 60px;
        max-height: 50px;
    }
    .registration-block{
        padding: 5px;
    }
    .subheading-block {
        padding: 5px;
        padding-left: 15px;
    }
  `;

class EventDiscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            application_confirmation_show: false,
            EmployerName: this.props.event.EmployerName,
            EventName: this.props.event.EventName,
            EmployerProfileUrl: this.props.event.EmployerProfileUrl,
            Address: this.props.event.Address,
            Majors: this.props.event.Majors,
            Description: this.props.event.Description,
            EventDate: new Date(this.props.event.EventDate),
            register_button_state: "primary",
            register_button_text: "Register",
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.applyHandleShow = this.applyHandleShow.bind(this);
        this.applyHandleClose = this.applyHandleClose.bind(this);
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })

    postDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            post_date: date,
        })
    };

    deadlineDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            deadline: date,
        })
    };
    applyHandleClose = (e) => {
        this.setState({
            apply_show: false,
        })
    };
    applyHandleShow = (e) => {
        this.setState({
            apply_show: true,
        })
    };
    handleClose = (e) => {
        this.setState({
            show: false,
            alertFlag: false,
        })
    };
    handleShow = (e) => {
        e.preventDefault();
        console.log("Inside handleShow");
        this.setState({
            show: true,
        })
    };

    registerHandleShow = (e) => {
        e.preventDefault();
        this.setState({
            register_button_state: "success",
            register_button_text: "Registered"
        })
        this.props.registerEvent(this.props.event, this.props.studentData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event) {
            console.log("event Discription Updated!!")
            this.setState({
                EmployerName: nextProps.event.EmployerName,
                EventName: nextProps.event.EventName,
                EmployerProfileUrl: nextProps.event.EmployerProfileUrl,
                Address: nextProps.event.Address,
                Majors: nextProps.event.Majors,
                Description: nextProps.event.Description,
                EventDate: new Date(nextProps.event.EventDate),
            });
        }
    }

    render() {
        if (!this.props.event) {
            return (
                <div>
                </div>
            );
        }
        return (
            <Styles>
                <Container className="job-discription-container">
                    <div>
                        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                        <Modal show={this.state.show} onHide={this.handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.addEventModalAlertFlag && <Alert variant="danger">Insert all values</Alert>}
                                <Form>
                                    <Form.Group controlId="employer">
                                        <Form.Label className="signup-form-lable">Event Title</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="EventName" placeholder="Event Title" />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="end_date">
                                            <Form.Label className="signup-form-lable">Registration Deadline</Form.Label>
                                            <br />
                                            <DatePicker selected={this.state.deadline} name="deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                            <br />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control name="Street" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Building</Form.Label>
                                            <Form.Control name="Apt" placeholder="CA" onChange={this.onChangeHandeler} />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control name="City" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control name="State" placeholder="CA" onChange={this.onChangeHandeler} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridCity">
                                            <Form.Label>Zip Code</Form.Label>
                                            <Form.Control name="Zipcode" placeholder="12345" onChange={this.onChangeHandeler} />
                                        </Form.Group>

                                    </Form.Row>
                                    <Form.Label>Majors</Form.Label>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="group-1">
                                            <Form.Check
                                                custom
                                                inline
                                                label="Computer Engineering"
                                                type="checkbox"
                                                name="Computer Engineering"
                                                onChange={this.handleCheckBoxChange}
                                                id={`checkbox-1`}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="group-2">
                                            <Form.Check
                                                custom
                                                inline
                                                label="Software Engineerings"
                                                type="checkbox"
                                                name="Software Engineerings"
                                                onChange={this.handleCheckBoxChange}
                                                id={`checkbox-2`}
                                            />

                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="group-3">
                                            <Form.Check
                                                custom
                                                inline
                                                label="Mechanical Engineering"
                                                type="checkbox"
                                                name="Mechanical Engineering"
                                                onChange={this.handleCheckBoxChange}
                                                id={`checkbox-3`}
                                            />

                                        </Form.Group>
                                        <Form.Group as={Col} controlId="group-4">
                                            <Form.Check
                                                custom
                                                inline
                                                label="Civil Engineering"
                                                type="checkbox"
                                                name="Civil Engineering"
                                                onChange={this.handleCheckBoxChange}
                                                id={`checkbox-4`}
                                            />
                                        </Form.Group>

                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="group-5">

                                            <Form.Check
                                                custom
                                                inline
                                                label="Electrical Engineering"
                                                type="checkbox"
                                                name="Electrical Engineering"
                                                onChange={this.handleCheckBoxChange}
                                                id={`checkbox-5`}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="group-6">
                                            <Form.Check
                                                custom
                                                inline
                                                label="Chemical Engineering"
                                                type="checkbox"
                                                name="Chemical Engineering"
                                                onChange={this.handleCheckBoxChange}
                                                id={`checkbox-6`}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Label> Event Detail</Form.Label>
                                        <Form.Control name="event_detail" as="textarea" placeholder="Discription..." onChange={this.onChangeHandeler} />
                                    </Form.Row>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                        </Button>
                                <Button variant="primary" onClick={this.addEventHandler}>
                                    Save Changes
                        </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="job-discription-heading">

                            <div className="job-discription-job-title">
                                <Row>
                                    <Col xs={11} md={11}>
                                        {this.state.EventName}
                                    </Col>
                                    {
                                        this.props.user.user_type === "employer" &&
                                        <Col xs={1} md={1}>
                                            <Icon style={{ fontSize: '16px', color: '#08c' }} type="edit" onClick={this.handleShow}></Icon>
                                        </Col>
                                    }
                                </Row>
                                <Row>
                                    <Col xs={11} md={11}>
                                        <div className="job-discription-job-employer">
                                            {this.state.EmployerName}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row className="subheading-block">
                                    <Col xs={0.5} md={0.5}>
                                        <Icon style={{ fontSize: '16px' }} type="calendar"></Icon>
                                    </Col>
                                    <Col xs={3} md={3}>
                                        <div className="job-discription-subheading">

                                            {"On " + (new Date(this.state.EventDate)).toDateString()}
                                        </div>
                                    </Col>
                                    <Col xs={0.5} md={0.5}>
                                        <Icon style={{ fontSize: '16px' }} type="global"></Icon>
                                    </Col>
                                    <Col xs={3} md={3}>
                                        <div className="job-discription-subheading">
                                            {this.state.Address.City}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="job-discription-apply-box">
                            <Row>
                                <Col xs={10} md={10}>
                                    <div style={{ paddingLeft:"7px", paddingTop: "5px" }}>
                                        Event {"is on " + (new Date(this.state.EventDate)).toDateString()} {"at " +
                                            (this.state.Address.City) + ", " + (this.state.Address.State)}
                                    </div>

                                </Col>
                                {this.props.user.user_type === "student" &&
                                    <Col xs={2} md={2}>
                                        <Button variant={this.state.register_button_state} onClick={this.registerHandleShow}>{this.state.register_button_text}</Button>
                                    </Col>
                                }
                            </Row>
                        </div>
                        <div className="job-discription-discription-title">
                            Event Detail:
                        </div>
                        <div className="job-discription-discription">
                            {this.state.Description}
                        </div>
                    </div>
                    <div className="profile-experience-card-divider"></div>
                </Container>
            </Styles>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth,
        studentData: state.student.studentData,
        registration_error: state.eventData.registration_error,
    };
};
//Export The Main Component
export default connect(mapStateToProps, { registerEvent })(EventDiscription);