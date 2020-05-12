import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import styled from 'styled-components';
import Signin from './Signin';
import StudentSignup from './StudentSignup';
import CompanySignup from './CompanySignup';
import { connect } from 'react-redux';
import { getLoginViewPage } from '../../redux/selectors';
import { changeLoginViewPage } from '../../redux/actions';


const Styles = styled.div`
.login-sidebar-text {
    padding: 20px;
  }
  
.login-sidebar-text-color {
    color: white;
  }
`;



//Define a Login Component
class Login extends Component {
    constructor(props) {
        super(props);
        this.signInHandler = this.signInHandler.bind(this);
        this.signUpHandler = this.signUpHandler.bind(this);
        this.companySignUpHandler = this.companySignUpHandler.bind(this);
        this.state = { viewPage: <Signin signUpHandler={this.signUpHandler} />};
    }

    signInHandler = (e) => {
        e.preventDefault();
        // console.log("Name: "+JSON.stringify(e));
        this.setState({
            viewPage: <Signin signUpHandler={this.signUpHandler} />
        })
    }

    signUpHandler = (e) => {
        e.preventDefault();
        // console.log("Name: "+JSON.stringify(e));
        this.setState({
            viewPage: <StudentSignup signInHandler={this.signInHandler} companySignUpHandler={this.companySignUpHandler} />
        })
    }

    companySignUpHandler = (e) => {
        e.preventDefault();
        // console.log("Name: "+JSON.stringify(e));
        this.setState({
            viewPage: <CompanySignup signInHandler={this.signInHandler} signUpHandler={this.signUpHandler} />
        })
    }

    render() {
        let redirectVar = null;
        if (this.props.user.email){
            redirectVar = <Redirect to="/jobs" />;
            return  redirectVar;
        }

        return (
            <Styles>
                <div>
                {redirectVar}
                    <Row>
                        <Col xs={4} md={4} className="login-sidebar">
                            <Container>
                                <div className="login-logo-image">
                                    <Image src="login-logo.svg" rounded height={50} />
                                </div>
                                <div className="login-sidebar-text">
                                    <h1 className="login-sidebar-text-color"><b>Get the job done  .</b></h1>
                                    <br />
                                    <br />
                                    <h4 className="login-sidebar-text-color">Students</h4>
                                    <h6 className="login-sidebar-text-color">Launch the next step in your career.</h6>
                                    <br />
                                    <h4 className="login-sidebar-text-color">Employers</h4>
                                    <h6 className="login-sidebar-text-color">Hire the next generation of talent.</h6>
                                    <br />
                                    <h4 className="login-sidebar-text-color">Career Centers</h4>
                                    <h6 className="login-sidebar-text-color">Bring the best jobs to your students.</h6>
                                </div>
                            </Container>

                        </Col>
                        <Col xs={8} md={8}>
                            <div>
                                {this.state.viewPage}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Styles>
        );
    }
}

const mapStateToProps = state => { 
    return {
        user: state.auth,
    };
  };

export default connect(mapStateToProps)(Login);