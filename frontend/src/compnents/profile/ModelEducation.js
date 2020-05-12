import React, { Component } from 'react';
import { Row, Col, Card, CardGroup, Container, Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getEducationByID, getEducation } from './../../redux/selectors';
import { updateStudentProfile} from './../../redux/actions/studentActions'

class ModelEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    };
    schoolChangeHandler = (e) => {
        // console.log("StudentEmail: " + e.target.value);
        this.setState({
            school: e.target.value
        })
    }
    majorChangeHandler = (e) => {
        // console.log("StudentEmail: " + e.target.value);
        this.setState({
            major: e.target.value
        })
    }
    levelChangeHandler = (e) => {
        // console.log(": " + e.target.value);
        this.setState({
            level: e.target.value
        })
    }
    gradDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            grad_date: date,
        })
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

    gpaChangeHandler = (e) => {
        this.setState({
            gpa: e.target.value,
        })
    }

    getUpdatedState = () => {
        const education =  {
            "_id": this.props.education._id,
            "School": this.props.education.School,
            "Major": this.props.education.Major,
            "Level": this.props.education.Level,
            "GradDate": this.props.education.GradDate,
            "GPA": this.props.education.GPA,
        }

        if(this.state.school){
            education.School = this.state.school;
        }
        if(this.state.major){
            education.Major = this.state.major;
        }
        if(this.state.level){
            education.Level = this.state.level;
        }
        if(this.state.grad_date){
            education.GradDate = this.state.grad_date;
        }
        if(this.state.gpa){
            education.GPA = this.state.gpa;
        }

        this.props.educations[this.props.id] = education;
        return {Educations: this.props.educations};
    }

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })

        this.props.updateStudentProfile(this.props.studentData,this.getUpdatedState());
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps recieved in ModalEducation: "+ JSON.stringify(nextProps.education));
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
                    <Modal.Title>Edit Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="school">
                            <Form.Label className="signup-form-lable">School</Form.Label>
                            <Form.Control onChange={this.schoolChangeHandler} defaultValue={this.props.education.School} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="major">
                                <Form.Label className="signup-form-lable">Major</Form.Label>
                                <Form.Control onChange={this.majorChangeHandler} defaultValue={this.props.education.Major} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="level">
                                <Form.Label className="signup-form-lable">Degree Level</Form.Label>
                                <Form.Control onChange={this.levelChangeHandler} defaultValue={this.props.education.Level} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="gradDate">
                                <Form.Label className="signup-form-lable">Grad Date</Form.Label>
                                <br />
                                <DatePicker selected={new Date(this.props.education.GradDate)} className="date_picker" onChange={this.gradDateChangeHandler} />
                                <br />
                            </Form.Group>
                            <Form.Group as={Col} controlId="gpa">
                                <Form.Label className="signup-form-lable">GPA</Form.Label>
                                <Form.Control onChange={this.gpaChangeHandler} type="number" defaultValue={this.props.education.GPA} />
                            </Form.Group>
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
            <div className="profile-education-card">
                <div className="profile-education-school">
                    <Row>
                        <Col xs={11} md={11}>
                            {this.props.education.School}
                        </Col>
                        <Col xs={1} md={1}>
                            <Icon type="edit" onClick={this.handleShow}></Icon>
                        </Col>
                    </Row>
                </div>
                <div className="profile-education-level">
                    {this.props.education.Level}
                </div>
                <div className="profile-education-major">
                    {"Major in " + this.props.education.Major}
                </div>
                <div className="profile-education-date">
                    {"Graduation date: " + this.props.education.GradDate}
                </div>
                <div className="profile-education-gpa">
                    {"Cumulative GPA: " + this.props.education.GPA}
                </div>
            </div>
            <div className="profile-education-card-divider"></div>
        </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    // console.log("Inside mapStateToProps of ModalEducattion: "+ JSON.stringify(ownProps));
    return { 
        education: getEducationByID(state.student.studentData, id),
        educations: getEducation(state.student.studentData),
        studentData: state.student.studentData,
    };
};

export default connect(mapStateToProps , { updateStudentProfile}) (ModelEducation);