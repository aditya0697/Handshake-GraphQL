import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, Button, Modal, Form } from 'react-bootstrap';
import { Icon } from 'antd';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import axios from "axios";
import { connect } from 'react-redux';
import { updateStudentProfile, updateStudentProfilePicture } from './../../redux/actions/studentActions'
import { updateEmployerProfile , updateEmployerProfilePicture} from './../../redux/actions/employerActions';
import { getPhoneNumber, getEmail, getProfileUrl, getName, getLastEducation, getFirstName, getLastName, getAddress } from './../../redux/selectors';


const Styles = styled.div`
   .profile-photo-card {
        max-height: 300px;
        overflow-y: scroll;
        width: 2100;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-photo {
    float: none;
    margin: 0 auto;
   }
   .profile-centered-div{
    float: none;
    margin: 0 auto;
   }
   .profile-name-text {
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 700;
   }
   .profile-university-text {
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 500;
   }
   .profile-graduates-text {
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 14px;
    font-weight: 300;
   }

`;


class ProfilePhotoCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            profile_show: false,
            profile_pic: null,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.profilePhotoModalHandleShow = this.profilePhotoModalHandleShow.bind(this);
        this.profilePhotoModalHandleClose = this.profilePhotoModalHandleClose.bind(this);
        this.onProfilePhotSubmit = this.onProfilePhotSubmit.bind(this);
    };

    profilePhotoModalHandleShow = (e) => {
        this.setState({
            profile_show: true,
        })
    }
    profilePhotoModalHandleClose = (e) => {
        this.setState({
            profile_show: false,
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

    validation = () => {
        if (this.state.first_name && this.state.last_name) {
            return true;
        }
        return false;
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    onFileUploadChangeHandler = event => {

        console.log(event.target.files[0])
        this.setState({
            profile_pic: event.target.files[0],
        })

    }

    onProfilePhotSubmit(e) {
        e.preventDefault();
        console.log("Inside onProfilePhotSubmit");
        // const formData = new FormData();
        // formData.append('user_email',this.props.user.email);
        // formData.append('user_type',this.props.user.user_type);
        // formData.append('profileImg', this.state.profile_pic);
        // // "http://localhost:3001/public/uploads/profile_pictures/IMAGE-1583906877260.jpg"
        // axios.post("http://localhost:3001/upload-profile",formData,{ headers: { 'Content-Type': 'multipart/form-data'}}).then((response) => {
        //         console.log("upload-profile response: " + JSON.stringify(response.data));
        //     }).catch((error) => {
        //         console.log("upload-profile error: " + JSON.stringify(error));
        //     });
        if(this.state.profile_pic){
            if(this.props.user.user_type === "student"){
                this.props.updateStudentProfilePicture(this.state.profile_pic,this.props.user.email);
            }else{
                this.props.updateEmployerProfilePicture(this.state.profile_pic,this.props.user.email);
            }
        }
        

        this.setState({
            profile_show: false,
        })
    }

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })

        if (this.props.user.user_type === "student") {
            if (this.state.first_name) {
                this.props.updateStudentFirstName(this.state.first_name);
            }
            if (this.state.last_name) {
                this.props.updateStudentLastName(this.state.last_name);
            }
        }
        if (this.props.user.user_type === "employer") {
            if (this.state.comapnay_name) {
                this.props.updateEmployerProfile(this.props.employerData,{ EmployerName: this.state.comapnay_name});
            }
        }
    }

    getProcessedDate = (date) => {
        if (!date) {
            return "";
        }
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(date);
        return monthNames[d.getMonth()] + " " + d.getUTCFullYear();
    }
    render() {
        return (
            <Styles>
                <div className="profile-photo-card">
                    <Row>
                        <Modal show={this.state.profile_show} onHide={this.profilePhotoModalHandleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Upload Your Profile Photo</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <input type="file" name="file" onChange={this.onFileUploadChangeHandler} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.profilePhotoModalHandleClose}>Close</Button>
                                <Button variant="primary" onClick={this.onProfilePhotSubmit}>Apply</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    {this.props.user.user_type === "student" &&
                                        <div>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="firstName">
                                                    <Form.Label className="signup-form-lable">First Name</Form.Label>
                                                    <Form.Control onChange={this.onValueChangeHandler} name="first_name" defaultValue={this.props.first_name} />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="lastName">
                                                    <Form.Label className="signup-form-lable">Last Name</Form.Label>
                                                    <Form.Control onChange={this.onValueChangeHandler} name="last_name" defaultValue={this.props.last_name} />
                                                </Form.Group>
                                            </Form.Row>
                                        </div>
                                    }
                                    {this.props.user.user_type === "employer" &&
                                        <div>
                                            <Form.Group as={Col} controlId="company_name">
                                                <Form.Label className="signup-form-lable">First Name</Form.Label>
                                                {/* this.props.name will be compnay_name if user is employer  */}
                                                <Form.Control onChange={this.onValueChangeHandler} name="comapnay_name" defaultValue={this.props.name} />
                                            </Form.Group>
                                        </div>
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
                    </Row>
                    <Row>
                        <div className="profile-photo">
                            <Avatar name={this.props.name} onClick={this.profilePhotoModalHandleShow} src={this.props.profileUrl} size={95} round={true} />
                        </div>
                        <Icon type="edit" onClick={this.handleShow}></Icon>
                        {/* <Button icon="edit" >edit
                        </Button> */}
                    </Row>
                    <Row>
                        {this.props.user.user_type === "employer" &&
                            <div className="profile-centered-div">
                                <div className="profile-name-text">{this.props.name}<br /></div>
                                <div className="profile-name-text">
                                    Address
                                </div>
                                {this.props.address &&
                                    <div>
                                        <div className="profile-university-text">
                                            {this.props.address.Street}
                                        </div>
                                        <div className="profile-university-text">
                                            {this.props.address.Apt}
                                        </div>
                                        <div className="profile-university-text">
                                            {this.props.address.City}, {this.props.address.State}, {this.props.address.Zipcode}
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </Row>
                    <Row>
                        {this.props.user.user_type === "student" &&
                            <div class="profile-centered-div">
                                <div className="profile-name-text">{this.props.name}<br /></div>
                                {this.props.education && <div className="profile-university-text">{this.props.education.School}<br /></div>}
                                {this.props.education && <div className="profile-university-text">{this.props.education.Level}  •  {this.props.education.Major}<br /></div>}
                                {this.props.education && <div className="profile-graduates-text">Graduates on {this.getProcessedDate(this.props.education.GradDate)}<br /></div>}
                                {this.props.education && <div className="profile-graduates-text">{this.props.education.Level}  • {this.props.education.GPA}<br /></div>}

                            </div>
                        }
                    </Row>
                </div>
            </Styles>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth,
        name: getName(state),
        first_name: getFirstName(state),
        last_name: getLastName(state),
        education: getLastEducation(state.student.studentData),
        email: getEmail(state),
        phoneNumber: getPhoneNumber(state),
        profileUrl: getProfileUrl(state),
        address: getAddress(state.employer.employerData),
        studentData: state.student.studentData,
        employerData: state.employer.employerData,
    };
};

export default connect(mapStateToProps, { updateStudentProfile, updateEmployerProfile, updateEmployerProfilePicture, updateStudentProfilePicture })(ProfilePhotoCard);