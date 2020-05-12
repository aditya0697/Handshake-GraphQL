import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { employerSignUp } from './../../redux/actions/authActions'

const Styles = styled.div``;

class CompanySignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertFlag: false,
            err: "Email lready exist!!",
        };
    };


    onChangeHandeler = (e) => this.setState({ [e.target.name]: e.target.value });

    validation = () => {
        console.log(this.state.comapnay_name + this.state.street + this.state.zip_code + this.state.state + this.state.city)
        if (this.state.comapnay_name && this.state.street && this.state.zip_code && this.state.state && this.state.city) {
            var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            
            return true;
        }
        return false;
    }

    onCreateAccountHandler = (e) => {
        e.preventDefault();
        if (!this.validation()) {
            this.setState({
                alertFlag: true,
                err: "Fill out all fields!!"
            })
            return;
        }
        const data = {
            "email": this.state.email,
            "password": this.state.password,
            "comapnay_name": this.state.comapnay_name,
            "phone_number": "",
            "profile_picture": "",
            "street": this.state.street,
            "apt_name": this.state.apt_name,
            "city": this.state.city,
            "state":this.state.state,
            "zip_code": this.state.zip_code,
            "country": "USA",
        }

        this.props.employerSignUp(data);
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/employer_signup', data)
        //     .then((response) => {
        //         console.log("Status Code : ", response.status);
        //         if (response.status === 200) {
        //             this.setState({
        //                 authFlag: true,
        //                 err: "SignUp Successful",
        //             })
        //             console.log("SignUp Successful")
        //             this.props.history.push("/jobs");
        //             this.props.login();
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
    };


    componentWillReceiveProps(nextProps) {
        console.log("Props received in company sign up ")
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
                this.props.history.push("/jobs");
            }
        }
    }


    render() {
        return (
            <Styles>
                <div className="signup-body">
                    <h2><b>Employer Sign up</b></h2>
                    {this.state.alertFlag && <Alert variant="danger">{this.state.err}</Alert>}
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="signup-form-lable">Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={this.onChangeHandeler} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label className="signup-form-lable">Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={this.onChangeHandeler} placeholder="Password" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="signup-form-lable">Companay Name</Form.Label>
                                <Form.Control placeholder="Name" onChange={this.onChangeHandeler} name="comapnay_name" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" onChange={this.onChangeHandeler} name="street" />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" onChange={this.onChangeHandeler}  name="apt_name" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" placeholder="San Jose" onChange={this.onChangeHandeler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control placeholder="California" name="state" onChange={this.onChangeHandeler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control placeholder="95192" name="zip_code" onChange={this.onChangeHandeler} />
                            </Form.Group>
                        </Form.Row>

                        <Row>
                            <Col xs={6} md={6}>
                                <Button variant="primary" type="submit" onClick={this.onCreateAccountHandler}>Create Account</Button>
                            </Col>
                            <Col xs={5} md={5}>
                                <div className="signin-signup">
                                    <h8>Already Have an account? <a className="signup-signin-link" href="#" onClick={this.props.signInHandler}>Sign in here.</a></h8>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="signup-signin">
                                    <p><a className="signup-signin-link" href="#" onClick={this.props.signUpHandler}>Are you a student? Create an account here.</a></p>
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
export default withRouter( connect(mapStateToProps, { employerSignUp })(CompanySignup));