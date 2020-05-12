import React, { Component } from 'react';
import { Row, Col, Card, CardGroup, Container, ListGroup, InputGroup, Form, FormControl, Button, Modal, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";

const Styles = styled.div`
    .profile-eductionCard-card {
        max-height: 950px;
        overflow-y: scroll;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .profile-education-card-divider{
        height:5px;
    }
   .profile-education-card {
        height: 175px;
        max-height: 275px;
        padding: 10px;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,.05), 1px 1px 1px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-education-title{
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
   .profile-education-level{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 540;
    height: 30px;
   }
   .profile-education-major{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 450;
    height: 30px;
   }
   .profile-education-date{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
    height: 30px;
   }
   .profile-education-gpa{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
    height: 30px;
   }
   .date_picker{
    z-index: 16000; 
   }
`;

class StudentProfileEducationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Educations : this.props.Educations
        }
       
    }

    render() {
        return (
            <Styles>
                <div className="profile-eductionCard-card ">
                    <div className="profile-education-title">
                        <Row>
                            <Col xs={11} md={11}>
                                Education
                            </Col>
                        </Row>
                    </div>
                    <div >
                    <div>
                        <div className="profile-education-card">
                            <div className="profile-education-school">
                                <Row>
                                    <Col xs={11} md={11}>
                                        {this.state.Educations.School}
                                    </Col>
                                </Row>
                            </div>
                            <div className="profile-education-level">
                                {this.state.Educations.Level}
                            </div>
                            <div className="profile-education-major">
                                {"Major in " + this.state.Educations.Major}
                            </div>
                            <div className="profile-education-date">
                                {"Graduation date: " + this.state.Educations.GradDate}
                            </div>
                            <div className="profile-education-gpa">
                                {"Cumulative GPA: " + this.state.Educations.GPA}
                            </div>
                        </div>
                        <div className="profile-education-card-divider"></div>
                    </div>
                    </div>
                </div>
            </Styles>
        );
    };
}

export default StudentProfileEducationCard;