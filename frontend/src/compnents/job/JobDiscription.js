import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, Jumbotron, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { getJobsQuery } from '../../queries/queries';
import { addApplication } from '../../mutations/mutations';
import { graphql, Query } from 'react-apollo';
import { flowRight as compose } from 'lodash';

// import {JobSidebar} from './jobsidebar/JobSidebar';

const Styles = styled.div`
    .job-discription-container{
        margin: 0 auto;
        overflow-y: scroll;
        height: 485px;
    }

    .job-discription-job-title{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 28px;
        font-weight: 620;
        max-height: 75px;
       }
    .job-discription-job-employer{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 16px;
        font-weight: 550;
        min-height: 15px;
        max-height: 25px;
       }
    .job-discription-heading{
        height: 115px;
        overflow-y:scrool;
        padding:5px;
    }
    .job-discription-subheading{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 350;
        min-height: 20px;
        max-height: 20px;
        vertical-align: middle;
        padding: 3px;
    }
    .job-discription-apply-box{
        max-height: 65px;
        overflow-y: scroll;
        margin: 10px;
        padding: 4px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .job-discription-discription-title{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 22px;
        font-weight: 450;
        padding: 10px;
        min-height: 40px;
        max-height: 60px;
        vertical-align: middle;
    }
    .job-discription-discription{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 50;
        overflow-y:scrool;
        padding: 10px;
        min-height: 60px;
        max-height: 50px;
    }
  `;

class JobDiscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            application_confirmation_show: false,
            id: this.props.job.id,
            EmployerID: this.props.job.EmployerID,
            EmployerName: this.props.job.EmployerName,
            Postion: this.props.job.Postion,
            City: this.props.job.Address.City,
            State: this.props.job.Address.State,
            Zipcode: this.props.job.Address.Zipcode,
            Type: this.props.job.Type,
            Salary: this.props.job.Salary,
            PostDate: new Date(),
            Deadline: new Date(),
            Description: this.props.job.Description,
            resume_file: null,
            apply_button_state: "primary",
            apply_button_text: "Apply",
        }
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    onFileUploadChangeHandler = event => {

        console.log(event.target.files[0])
        this.setState({
            resume_file: event.target.files[0],
        })

    }
    getJobTypeOtionId = () => {
        switch (this.state.Type) {
            case "Full Time":
                return 0;
            case "Part Time":
                return 1;
            case "Intern":
                return 2;
            case "On Campus":
                return 3;
            default:
                return 3;
        }

    }
    setShow = (show) => {
        this.setState({
            application_confirmation_show: false,
        })
    }
    postDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            PostDate: date,
        })
    };

    deadlineDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            Deadline: date,
        })
    };

    applyClickeHandler = (e) => {
        e.preventDefault();
        this.setState({
            apply_show: false,
            apply_button_state: "success",
            apply_button_text: "Applied",
            application_confirmation_show: true,
        })
        this.props.addApplication({
            variables: {
                StudentID: localStorage.getItem("id"),
                EmployerID: this.state.EmployerID,
                JobID: this.state.id
            }
        })
    }


    getProcessedDate = (date) => {
        if (!date) {
            return "";
        }
        const d = new Date();
        return d.toDateString();
    }
    render() {
        if (!this.props.job) {
            return (
                <div>
                </div>
            );
        }
        return (
            <Styles>
                <Container className="job-discription-container">
                    <div>
                        {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                        {this.state.application_confirmation_show &&
                            <Alert variant="success" onClose={() => { this.setShow(false) }} dismissible>
                                <Alert.Heading>Application Submitted!</Alert.Heading>
                            </Alert>
                        }
                        {this.state.apply_error &&
                            <Alert variant="danger" onClose={() => this.setShow(false)} dismissible>
                                <Alert.Heading>{this.state.apply_error}!</Alert.Heading>
                            </Alert>
                        }

                        <div className="job-discription-heading">

                            <div className="job-discription-job-title">
                                <Row>
                                    <Col xs={11} md={11}>
                                        {this.state.Postion}
                                    </Col>
                                    {
                                        localStorage.getItem("Type") === "employer" &&
                                        <Col xs={1} md={1}>
                                            <Icon style={{ fontSize: '16px', color: '#08c' }} type="edit" onClick={this.handleShow}></Icon>
                                        </Col>
                                    }
                                </Row>
                                <Row>
                                    <Col xs={11} md={11}>
                                        <div className="job-discription-job-employer">
                                            {this.state.EmployerName}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row style={{ display: "flex", justifyContent: "flex-center" }}>
                                    <Col xs={1} md={1}>
                                        <Icon style={{ fontSize: '16px' }} style={{ display: "flex", justifyContent: "flex-center" }, { paddingTop: "3px" }} type="bank" ></Icon>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <div className="job-discription-subheading" >
                                            {this.state.Type}
                                        </div>
                                    </Col>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} style={{ display: "flex", justifyContent: "flex-center" }, { paddingTop: "3px" }} type="money-collect" ></Icon>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <div className="job-discription-subheading">
                                            ${this.state.Salary}
                                        </div>
                                    </Col>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} style={{ display: "flex", justifyContent: "flex-center" }, { paddingTop: "3px" }} type="home" ></Icon>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <div className="job-discription-subheading">
                                            {this.state.City}
                                        </div>
                                    </Col>
                                    <Col xs={0.1} md={0.1}>
                                        <Icon style={{ fontSize: '16px' }} style={{ display: "flex", justifyContent: "flex-center" }, { paddingTop: "3px" }} type="history"></Icon>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <div className="job-discription-subheading">
                                            Posted on {(new Date(this.state.PostDate)).toDateString()}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="job-discription-apply-box">
                            <Row>
                                <Col xs={10} md={10}>
                                    <div style={{ paddingLeft: "7px", paddingTop: "5px" }}>
                                        Applications close on <b>{this.getProcessedDate(this.state.Deadline)} </b>
                                    </div>

                                </Col>
                                {localStorage.getItem("Type") === "student" &&
                                    <Col xs={2} md={2}>
                                        <Button variant={this.state.apply_button_state}
                                            style={{ display: "flex", justifyContent: "flex-end" }}
                                            onClick={this.applyClickeHandler}>{this.state.apply_button_text}</Button>
                                    </Col>
                                }
                            </Row>
                        </div>
                        <div className="job-discription-discription-title">
                            Job Responsibilities:
                        </div>
                        <div className="job-discription-discription">
                            {this.state.Description}
                        </div>
                    </div>
                    <div className="profile-experience-card-divider"></div>
                </Container>
            </Styles>
        )
    }
}
//Export The Main Component
export default compose(
    graphql(addApplication, {
        name: "addApplication"
    }))(JobDiscription);