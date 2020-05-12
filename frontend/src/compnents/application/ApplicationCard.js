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
        font-weight: 500;
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


class ApplicationCard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false,
            status_show: false,
            application_id: this.props.application._id,
            StudentID: this.props.application.StudentID,
            EmployerID: this.props.application.EmployerID,
            StundetName: this.props.application.StudentID.FirstName + this.props.application.StudentID.LastName ,
            StudentProfileUrl: "",
            JobID: this.props.application.JobID,
            Status: this.props.application.Status,
            ResumeURL: "",
            selectedStatus: "Submitted",
        }
        this.clickHandler = this.clickHandler.bind();
    }

    resumeClickHandler = (e) => {
        e.preventDefault();
        return (<Redirect to={this.state.ResumeURL} />);
    }
    clickHandler = (e) => {
        e.preventDefault();
    }
    statusHandleClose = (e) => {
        this.setState({
            status_show: false,
        })
    };
    statusHandleShow = (e) => {
        this.setState({
            status_show: true,
        })
    };
    statusChangeHandler = (e) => {
        e.preventDefault();
        this.statusHandleClose();
        this.props.changeApplicationStatus(this.props.application, this.state.Status);
    }
    onChangeHandeler = (e) => this.setState({ [e.target.name]: e.target.value });

    getStatusOptionId = () => {
        switch (this.state.Status) {
            case "Submitted":
                return 0;
            case "Pending":
                return 1;
            case "Reviewed":
                return 2;
            case "Declined":
                return 3;
            default:
                return 0;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.application) {
            this.setState({
                application_id: nextProps.application._id,
                Job: nextProps.application.Job,
                StundetName: nextProps.application.Student.Name,
                StudentProfileUrl: nextProps.application.Student.ProfileUrl,
                Status: nextProps.application.Status,
                ResumeURL: nextProps.application.ResumeURL,
            });
        }
    }

    render() {
        if (localStorage.getItem("Type") == "employer") {
            return (
                <Styles>
                    <Container onClick={this.clickHandler} className="application-card-holder">
                    <div className="application-card-holder">
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar name={this.state.StundetName} src={this.state.StudentProfileUrl} size={55} round={false} />
                            </Col>

                            <Col sd={8} md={8}>
                                <Row className="job-card-postion-name">
                                    <Col sd={8} md={8}>
                                        <span><b>{this.state.StudentID.FirstName +" "+this.state.StudentID.LastName}</b></span>
                                    </Col>
                                    {this.props.user.user_type === "employer" &&
                                        <Col sd={1} md={1}>
                                            <Icon type="edit" onClick={this.statusHandleShow}></Icon>
                                        </Col>
                                    }
                                </Row>
                                <div className="job-card-company-name">
                                    {this.state.JobID.Postion}
                                </div>
                                <div className="job-card-jobtype">
                                    <span>{this.state.JobID.Type}</span>
                                </div>
                                <div>
                                    <Row>

                                        <Col sd={7} md={7} className="application-card-status">
                                            <Icon type="audit" onClick={this.handleShow}></Icon>
                                            <span>Status: {this.state.Status}</span>
                                        </Col>

                                        <Col sd={3} md={3}>
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <Icon type="audit" onClick={this.handleShow} style={{ padding: "5px" }}></Icon>
                                                <span> <a href="" target="_blank" rel="noopener noreferrer"> resume </a></span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                </Styles>
            )
        }
        else {
        return (
            <Styles>
                <Container onClick={this.clickHandler} className="application-card-holder">
                    <div className="application-card-holder">
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar name={this.state.EmployerID.EmployerName} src="" size={55} round={false} />
                            </Col>

                            <Col sd={8} md={8}>
                                <Row className="job-card-postion-name">
                                    <Col sd={8} md={8}>
                                        <span><b>{this.state.JobID.Postion}</b></span>
                                    </Col>
                                </Row>
                                <Row> <span><a href="">By {this.state.EmployerID.EmployerName}</a></span></Row>
                                <div className="job-card-company-name">
                                    <span>{this.state.employer} - {this.state.JobID.Address.City}, {this.state.JobID.Address.State}</span>
                                </div>
                                <div className="job-card-jobtype">
                                    <span>{this.state.JobID.Type}</span>
                                </div>
                                <div>
                                    <Row>

                                        <Col sd={7} md={7} className="application-card-status">
                                            <Icon type="audit" onClick={this.handleShow}></Icon>
                                            <span>Status: {this.state.Status}</span>
                                        </Col>

                                        <Col sd={3} md={3}>
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <Icon type="audit" onClick={this.handleShow} style={{ padding: "5px" }}></Icon>
                                                <span> <a href="" target="_blank" rel="noopener noreferrer"> resume </a></span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
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

export default connect(mapStateToProps, { changeApplicationStatus })(ApplicationCard);