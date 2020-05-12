import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, ListGroup, InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { List } from 'antd';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { getObjective, getEmployerDiscription, getName, getFirstName } from './../../redux/selectors';
import { updateStudentProfile } from './../../redux/actions/studentActions';
import {updateEmployerProfile} from './../../redux/actions/employerActions';

const Styles = styled.div`
   .profile-objective-card {
        max-height: 550px;
        overflow-y: scroll;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-objective-title{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 550;
    height: 30px;
   }
   
   .profile-objective-value{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 150;
    min-height: 20px;
   }
`;

class ProfileCareerObjectiveCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = (e) => {
        this.setState({
            show: false,
        })
    };
    handleShow = (e) => {
        console.log("Inside handleShow");
        this.setState({
            show: true,
        })
    };

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })
        if(this.props.user.user_type === "student") {
            if (this.state.objective) {
                const data = {
                    CareerObjective: this.state.objective,
                }
                this.props.updateStudentProfile(this.props.studentData, data);
            }
        }
        if(this.props.user.user_type === "employer"){
            if (this.state.discription) {
                const data = {
                    EmployerDescription: this.state.discription,
                }
                this.props.updateEmployerProfile(this.props.employerData, data);
            }
        }
        
    }

    render() {

        return (
            <Styles>
                <div className="profile-objective-card ">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            {
                                this.props.user.user_type === "student" &&
                                <Modal.Title>Edit Your Journey!</Modal.Title>
                            }
                            {
                                this.props.user.user_type === "employer" &&
                                <Modal.Title>Update About us!</Modal.Title>
                            }

                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {
                                    this.props.user.user_type === "student" &&
                                    <Form.Row>
                                        <Form.Label>Objective</Form.Label>
                                        <Form.Control name="objective" as="textarea" defaultValue={this.props.careerObjective} onChange={this.onValueChangeHandler} />
                                    </Form.Row>
                                }
                                {
                                    this.props.user.user_type === "employer" &&
                                    <Form.Row>
                                        <Form.Label>About us</Form.Label>
                                        <Form.Control name="discription" as="textarea" defaultValue={this.props.discription} onChange={this.onValueChangeHandler} />
                                    </Form.Row>
                                }
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={this.saveChangeHandler}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="profile-objective-title">
                        <Row>
                            <Col xs={11} md={11}>
                                {
                                    this.props.user.user_type === "student" &&
                                    <div>{this.props.first_name}'s Journey.</div>
                                }
                                {
                                    this.props.user.user_type === "employer" &&
                                    <div>About {this.props.name}</div>
                                }
                            </Col>
                            <Col xs={1} md={1}>
                                <Icon type="edit" onClick={this.handleShow}></Icon>
                            </Col>
                        </Row>
                    </div>
                    {
                        this.props.user.user_type === "student" &&
                        <div className="profile-objective-value">
                            {this.props.careerObjective}
                        </div>
                    }
                    {
                        this.props.user.user_type === "employer" &&
                        <div className="profile-objective-value">
                            {this.props.discription}
                        </div>
                    }

                </div>
            </Styles>

        );
    };
}
const mapStateToProps = state => {
    return {
        careerObjective: getObjective(state.student.studentData),
        user: state.auth,
        name: getName(state),
        first_name: getFirstName(state),
        discription: getEmployerDiscription(state.employer.employerData),
        studentData: state.student.studentData,
        employerData: state.employer.employerData,
    };
};

export default connect(mapStateToProps, { updateStudentProfile, updateEmployerProfile })(ProfileCareerObjectiveCard);