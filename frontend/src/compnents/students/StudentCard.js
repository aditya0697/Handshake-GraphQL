import React, { Component } from 'react';
import { Route , withRouter} from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {createConversation } from './../../redux/actions/messageAction';
import {getName, getProfileUrl} from './../../redux/selectors';

const Styles = styled.div`
   .student-card-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 20px;
        font-weight: 550;
   }
   .student-card-holder{
        width: 850px,
        height: 80px;
        padding: 5px;
        background-color: #ffff;
   }
   .job-card-jobtype {

   }
   .application-card-holder{
       width: 750px,
       height: 80px;
       padding: 5px;
   }
   .resume-link{
       target: _blank;
   }
   .student-card-education{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 500;
   }
   .student-card-experience{
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 12px;
        font-weight: 400;
   }
`;


class StudentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            apply_show: false,
            id: this.props.student.id,
            FirstName: this.props.student.FirstName,
            LastName: this.props.student.LastName,
            Educations: this.props.student.Educations,
            Experiences: this.props.student.Experiences,
        }
        this.clickHandler = this.clickHandler.bind();
    }

    clickHandler = (e) => {
        e.preventDefault();
        this.props.studentCardClickHandler(this.state.id);
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.student: " + JSON.stringify(nextProps.student));
        if (nextProps.student) {
            this.setState({
                id: nextProps.student.id,
                FirstName: nextProps.student.FirstName,
                LastName: nextProps.student.LastName,
                Educations: nextProps.student.Educations,
                Experiences: nextProps.student.Experiences,
            })
        }
    }
    render() {
        return (
            <Styles>
                <Container  className="student-card-holder">
                    <div className="student-card-holder">
                        <Row>
                            <Col sd={2} md={2}>
                                <Avatar onClick={this.clickHandler} name={this.state.FirstName + " " + this.state.LastName} src={this.state.ProfileUrl} size={75} round={true} />
                            </Col>

                            <Col sd={8} md={8}>
                                <Row className="student-card-name">
                                    <Col sd={11} md={11}>
                                        <span><b>{this.state.FirstName + " " + this.state.LastName}</b></span>
                                    </Col>
                                </Row>
                                <div className="student-card-education">
                                    <span>{this.state.Educations.School}</span>
                                </div>
                                <div className="student-card-education">
                                    <span>{this.state.Educations.Level} in {this.state.Educations.Major}</span>
                                </div>
                                {
                                    this.state.Experience &&
                                    <div className="student-card-experience">
                                        <span>Worked at {this.state.Experiences.Employer}</span>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </div>
                </Container>

            </Styles>
        )
    }
}


export default StudentCard;