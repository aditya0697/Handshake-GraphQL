import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Row, Col, Modal, Form, Button, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeApplicationStatus } from './../../redux/actions/applicationAction';

const Styles = styled.div`
   .job-card-postion-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 16px;
        font-weight: 600;
   }
   .job-card-company-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 300;
   }
   .job-card-jobtype {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 12px;
        font-weight: 300;
   }
   .application-card-status {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 12px;
        font-weight: 400;
   }
   .application-card-holder{
       width: 650px,
       height: 80px;
       padding: 5px;
   }
   .resume-link{
       target: _blank;
   }
`;


class RegistrationCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            EmployerName: this.props.registration.Event.EmployerName,
            EventName: this.props.registration.Event.EventName,
            EmployerProfileUrl: this.props.registration.Event.EmployerProfileUrl,
            StundetName: this.props.registration.Student.Name,
            StudentProfileUrl: this.props.registration.Student.ProfileUrl,
            Address: this.props.registration.Event.Address,
            Majors: this.props.registration.Event.Majors,
            Description: this.props.registration.Event.Description,
            EventDate: this.props.registration.Event.EventDate,
            show: false,
        }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.registration: " + JSON.stringify(nextProps.registration));
        if (nextProps.registration) {
            this.setState({
                EmployerName: nextProps.registration.Event.EmployerName,
                EventName: nextProps.registration.Event.EventName,
                EmployerProfileUrl: nextProps.registration.Event.EmployerProfileUrl,
                StundetName: nextProps.registration.Name,
                StudentProfileUrl: nextProps.registration.ProfileUrl,
                Address: nextProps.registration.Event.Address,
                Majors: nextProps.registration.Event.Majors,
                Description: nextProps.registration.Event.Description,
                EventDate: nextProps.registration.Event.post_date,
            })
        }
    }

    render() {
        if (this.props.user.user_type == "student") {
            return (
                <Styles>
                    <Container>
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar name={this.state.EmployerName} src={this.state.EmployerProfileUrl} size={50} round={false} />
                            </Col>
                            <Col sd={8} md={8}>
                                <div className="job-card-postion-name">
                                    <span><b>{this.state.EventName}</b></span>
                                </div>
                                <div className="job-card-company-name">
                                    <span><a >{this.state.EmployerName}</a></span>
                                </div>
                                <div className="job-card-jobtype">
                                    <span>On {(new Date(this.state.EventDate)).toDateString()}</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Styles>
            )
        }
        else {
            return (
                <Styles>
                    <Container>
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar name={this.state.StundetName} src={this.state.StudentProfileUrl} size={50} round={false} />
                            </Col>
                            <Col sd={8} md={8}>
                                <div className="job-card-postion-name">
                                    <span><b>{this.state.EventName}</b></span>
                                </div>
                                <div className="job-card-company-name">
                                    <span><a>{this.state.EmployerName}</a></span>
                                </div>
                                <div className="job-card-jobtype">
                                    <span>On {(new Date(this.state.EventDate)).toDateString()}</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Styles>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
        // job_profile_pic: getProfileUrlForEmployerForJob(state.job),
    };
};

export default connect(mapStateToProps, {})(RegistrationCard);