import React, { Component } from 'react';
import { Row, Col, Card, CardGroup, Container, Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getExperienceByID, getExperience } from './../../redux/selectors';
import {  updateStudentProfile } from './../../redux/actions/studentActions';

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

class ModelExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };

    handleClose = (e) => {
        this.setState({
            show: false,
        })
    };
    handleShow = (e) => {
        e.preventDefault();
        this.setState({
            show: true,
        })
    };
    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })

    getUpdatedState = () => {
        const experience = {
            "_id": this.props.experience.exp_id,
            "Employer": this.props.experience.employer,
            "Title": this.props.experience.title,
            "StartDate": this.props.experience.start_date,
            "EndDate": this.props.experience.end_date,
            "Description": this.props.experience.discription,
        }

        if (this.state.employer) {
            experience.employer = this.state.employer;
        }
        if (this.state.title) {
            experience.title = this.state.title;
        }
        if (this.state.StartDate) {
            experience.start_date = this.state.start_date;
        }
        if (this.state.end_date) {
            experience.end_date = this.state.end_date;
        }
        if (this.state.discription) {
            experience.discription = this.state.discription;
        }
        this.props.experiences[this.props.id] = experience;
        return {Experiences: this.props.experiences};
    }

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })
        console.log("getUpdatedState: " + JSON.stringify(this.getUpdatedState()));
        this.props.updateStudentProfile(this.props.studentData,this.getUpdatedState());
        // this.props.updateExperienceById(this.getUpdatedState(), this.props.id);
    }

    getProcessedDate = (date) => {
        if (!date) {
            return "";
        }
        const d = new Date(date);
        return d.toLocaleString('US').split(',')[0];
    }
    startDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            start_date: date,
        })
    }
    endDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            end_date: date,
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps recieved in ModalEducation: " + JSON.stringify(nextProps.education));
        // this.setState({
        //     school: nextProps.education.school,
        //     major: nextProps.education.edu_major,
        //     level: nextProps.education.level,
        //     gradDate: new Date(nextProps.education.grad_date),
        //     gpa: nextProps.education.gpa,
        // })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="employer">
                                <Form.Label className="signup-form-lable">Employer</Form.Label>
                                <Form.Control onChange={this.onValueChangeHandler} name="employer" defaultValue={this.props.experience.Employer} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="title">
                                    <Form.Label className="signup-form-lable">Title</Form.Label>
                                    <Form.Control onChange={this.onValueChangeHandler} name="title" defaultValue={this.props.experience.Title} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label className="signup-form-lable">Start Date</Form.Label>
                                    <br />
                                    <DatePicker selected={new Date(this.props.experience.StartDate)} name="start_date" className="date_picker" onChange={this.startDateChangeHandler} />
                                    <br />
                                </Form.Group>
                                <Form.Group as={Col} controlId="">
                                    <Form.Label className="signup-form-lable">End Date</Form.Label>
                                    <br />
                                    <DatePicker selected={new Date(this.props.experience.EndDate)} name="end_date" className="date_picker" onChange={this.endDateChangeHandler} />
                                    <br />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name="discription" as="textarea"  defaultValue={this.props.experience.Description} onChange={this.onValueChangeHandler} />
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
                <div>
                    <div className="profile-experience-card">
                        <div className="profile-education-school">
                            <Row>
                                <Col xs={11} md={11}>
                                    {this.props.experience.Employer}
                                </Col>
                                <Col xs={1} md={1}>
                                    <Icon type="edit" onClick={this.handleShow}></Icon>
                                </Col>
                            </Row>
                        </div>
                        <div className="profile-experience-title">
                            {this.props.experience.Title}
                        </div>
                        <div className="profile-experience-date">
                            {"Start date: " + this.getProcessedDate(this.props.experience.StartDate)}
                        </div>
                        <div className="profile-experience-date">
                            {"End date: " + this.getProcessedDate(this.props.experience.EndDate)}
                        </div>
                        <div className="profile-experience-discription">
                            {this.props.experience.Description}
                        </div>
                    </div>
                    <div className="profile-experience-card-divider"></div>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    // console.log("Inside mapStateToProps of ModalEducattion: "+ JSON.stringify(ownProps));
    return {
        experience: getExperienceByID(state.student.studentData, id),
        experiences: getExperience(state.student.studentData),
        studentData: state.student.studentData
    };
};

export default connect(mapStateToProps, {  updateStudentProfile })(ModelExperience);