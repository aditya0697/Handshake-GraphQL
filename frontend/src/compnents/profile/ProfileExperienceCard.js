import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, ListGroup, InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Icon } from 'antd';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import { List } from 'antd';
import { connect } from 'react-redux';
import { getExperience } from './../../redux/selectors';
import ModalExperience from './ModalExperience';
import { updateStudentProfile } from './../../redux/actions/studentActions'

const Styles = styled.div`
    .profile-experienceCard-card {
        max-height: 800px;
        overflow-y: scroll;
        margin: 10px;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .profile-experience-card-divider{
        height:5px;
    }
   .profile-experience-card {
        height: 225px;
        max-height: 275px;
        padding: 10px;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,.05), 1px 1px 1px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-experience-name{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    font-weight: 550;
    height: 30px;
   }
   .profile-education-school{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    font-weight: 550;
    height: 30px;
   }
   .profile-experience-title{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 540;
    height: 30px;
   }

   .profile-experience-date{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
    height: 30px;
   }
   .profile-experience-discription{
    height: 100px;
    overflow-y: scroll;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
   }
`;

class ProfileExperienceCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertFlag: false,
            start_date: new Date(),
            end_date: new Date(),
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

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

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })

    startDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            start_date: date,
        })
    };
    endDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            end_date: date,
        })
    }
    validation = () => {
        if (this.state.employer && this.state.title && this.state.start_date && this.state.end_date && this.state.discription) {
            return true;
        }
        return false;
    }
    getUpdatedState = () => ({
        Employer: this.state.employer,
        Title: this.state.title,
        StartDate: this.state.start_date.toISOString(),
        EndDate: this.state.end_date.toISOString(),
        Description: this.state.discription,
    });

    saveChangeHandler = (e) => {
        if (!this.validation()) {
            this.setState({
                alertFlag: true,
                start_date: new Date(),
                end_date: new Date(),
            })
            return;
        }
        e.preventDefault();
        this.setState({
            show: false,
        })
        console.log("getUpdatedState: " + JSON.stringify(this.getUpdatedState()));
        this.props.experiences.push(this.getUpdatedState());
        this.props.updateStudentProfile(this.props.studentData, this.props.experiences);
    }

    render() {
        let experienceDetails = [];
        if (this.props.experiences) {
            experienceDetails = this.props.experiences.map((job,id) => {
                if(!job){
                    return;
                }
                return (
                    <ModalExperience id={id}/>
                )
            })
        }

        return (
            <Styles>
                <div className="profile-experienceCard-card ">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="employer">
                                <Form.Label className="signup-form-lable">Employer</Form.Label>
                                <Form.Control onChange={this.onValueChangeHandler} name="employer" placeholder="employer" />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="title">
                                    <Form.Label className="signup-form-lable">Title</Form.Label>
                                    <Form.Control onChange={this.onValueChangeHandler} name="title" placeholder="title"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="start_date">
                                    <Form.Label className="signup-form-lable">Start Date</Form.Label>
                                    <br />
                                    <DatePicker selected={this.state.start_date} name="start_date" className="date_picker" onChange={this.startDateChangeHandler} />
                                    <br />
                                </Form.Group>
                                <Form.Group as={Col} controlId="end_date">
                                    <Form.Label className="signup-form-lable">End Date</Form.Label>
                                    <br />
                                    <DatePicker selected={this.state.end_date} name="end_date" className="date_picker" onChange={this.endDateChangeHandler} />
                                    <br />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name="discription" as="textarea"  placeholder="Discription..." onChange={this.onValueChangeHandler} />
                            </Form.Row>
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
                    <div className="profile-experience-name">
                        <Row>
                            <Col xs={11} md={11}>
                                Work & Volunteer Experience
                            </Col>
                            <Col xs={1} md={1}>
                                <Icon type="plus" onClick={this.handleShow}></Icon>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        {experienceDetails}
                    </div>
                </div>
            </Styles>

        );
    };
}
const mapStateToProps = state => {
    return {
        experiences: getExperience(state.student.studentData),
        studentData: state.student.studentData,
        user: state.auth,
    };
};
export default connect(mapStateToProps, { updateStudentProfile})(ProfileExperienceCard);