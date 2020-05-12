import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import {studentSignUp} from './../../redux/actions/authActions'

const Styles = styled.div`

    .signup-body {
        padding: 100px;
        padding-left: 150px;
        padding-bottom: 2px;
        padding-right: 200px;
    }

    .signup-form-lable {
        font-weight: bold;
        font-size: 12px;
    }

    .signup-signin-link {
        color : #0066ff;
    }

    .signup-signin {
        padding : 5px;
        font-weight: bold;
        font-size: 12px;
    }
`;

class StudentSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            school: "",
            major: "",
            level: "",
            gradDate: "",
            alertFlag: false,
            err: "Email lready exist!!",
        };
    };



    emailChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            email: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            password: e.target.value
        })
    }
    firstNameChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            lastName: e.target.value
        })
    }
    schoolChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            school: e.target.value
        })
    }
    majorChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            major: e.target.value
        })
    }
    levelChangeHandler = (e) => {
        console.log("StudentEmail: " + e.target.value);
        this.setState({
            level: e.target.value
        })
    }
    gradDateChangeHandler = (date, dateString) => {
        console.log(date, dateString);
        this.setState({
            gradDate: dateString,
        })
    }
    onCreateAccountHandler = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            school: this.state.school,
            major: this.state.major,
            level: this.state.level,
            gradDate: this.state.gradDate,
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        // axios.post('http://localhost:3001/student_signup', data)
        //     .then((response) => {
        //         console.log("Status Code : ", response.status);
        //         if (response.status === 200) {
        //             this.setState({
        //                 authFlag: true,
        //                 err: "SignUp Successful",
        //             })
        //             console.log("SignUp Successful")
        //             this.props.history.push("/jobs");
        //             // this.props.login();
        //         } else {
        //             console.log("Status Code : ");
        //             this.setState({
        //                 alertFlag: true,
        //                 err: "Email",
        //             });
        //         }
        //     },
        //         (error) => {
        //             console.log(" error Status Code : ", JSON.stringify(error));
        //             this.setState({
        //                 alertFlag: true,
        //                 err: error.response.data.errMessage,
        //             })
        //         });
        this.props.studentSignUp(data);
    };

    componentWillReceiveProps(nextProps) {
        console.log("Props received in signin ")
        console.log(nextProps)
        if(nextProps.user){
            if(nextProps.user.error){
                console.log("Signup email: "+ nextProps.user.error);
                this.setState({
                    alertFlag: true,
                    err: nextProps.user.error
                })
            }else if(nextProps.user.email){ 
                // this.props.login(this.state.studentEmail, null);
                // localStorage.setItem('user',nextProps.user)
                console.log("Signup email: "+ nextProps.user.email);
                this.props.history.push("/profile");
            }
        }
    }
    render() {
        return (
            <Styles>
                <div className="signup-body">
                    <h2><b>Student Sign up</b></h2>
                    {this.state.alertFlag && <Alert variant="danger">{this.state.err}</Alert>}
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="email">
                                <Form.Label className="signup-form-lable">Email</Form.Label>
                                <Form.Control onChange={this.emailChangeHandler} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="password">
                                <Form.Label className="signup-form-lable">Password</Form.Label>
                                <Form.Control onChange={this.passwordChangeHandler} type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label className="signup-form-lable">First Name</Form.Label>
                                <Form.Control onChange={this.firstNameChangeHandler} placeholder="Name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label className="signup-form-lable">Last Name</Form.Label>
                                <Form.Control onChange={this.lastNameChangeHandler} placeholder="Last Name" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="school">
                            <Form.Label className="signup-form-lable">School</Form.Label>
                            <Form.Control onChange={this.schoolChangeHandler} placeholder="School" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="major">
                                <Form.Label className="signup-form-lable">Major</Form.Label>
                                <Form.Control onChange={this.majorChangeHandler} placeholder="Major" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="level">
                                <Form.Label className="signup-form-lable">Degree Level</Form.Label>
                                <Form.Control onChange={this.levelChangeHandler} placeholder="Degree Level" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="gradDate">
                                <Form.Label className="signup-form-lable">Grad Date</Form.Label>
                                <br />
                                <DatePicker onChange={this.gradDateChangeHandler} placeholder="Select date" />
                                <br />
                            </Form.Group>
                        </Form.Row>
                        <Row>
                            <Col xs={6} md={6}>
                                <Button variant="primary" onClick={this.onCreateAccountHandler} type="submit">Create Account</Button>
                            </Col>
                            <Col xs={5} md={5}>
                                <div className="signin-signup">
                                    <p>Already Have an account? <a className="signup-signin-link" href="#" onClick={this.props.signInHandler}>Sign in here.</a></p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="signup-signin">
                                    <p><a className="signup-signin-link" href="#" onClick={this.props.companySignUpHandler}>Are you an employer? Create an account here.</a></p>
                                </div>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </Styles >
        );
    };
}
const mapStateToProps = state => { 

    return { 
       user: state.auth,
    };
  };
export default withRouter( connect(mapStateToProps,{studentSignUp})(StudentSignup));