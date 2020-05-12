import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .profile-experienceCard-card {
        max-height: 800px;
        overflow-y: scroll;
        margin: 10px;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .profile-experience-card-divider{
        height:5px;
    }
   .profile-experience-card {
        height: 225px;
        max-height: 275px;
        padding: 10px;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,.05), 1px 1px 1px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-experience-name{
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
   .profile-experience-title{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 540;
    height: 30px;
   }

   .profile-experience-date{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
    height: 30px;
   }
   .profile-experience-discription{
    height: 100px;
    overflow-y: scroll;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 350;
   }
`;

class StudentProfileExperienceCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Experiences: this.props.Experiences
        }
    }

    getProcessedDate = (date) => {
        if (!date) {
            return "";
        }
        const d = new Date(date);
        return d.toLocaleString('US').split(',')[0];
    }

    render() {
       
        return (
            <Styles>
                <div className="profile-experienceCard-card ">
                    <div className="profile-experience-name">
                        <Row>
                            <Col xs={11} md={11}>
                                Work & Volunteer Experience
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <div>
                            <div className="profile-experience-card">
                                <div className="profile-education-school">
                                    <Row>
                                        <Col xs={11} md={11}>
                                            {this.state.Experiences.Employer}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="profile-experience-title">
                                    {this.state.Experiences.Title}
                                </div>
                                <div className="profile-experience-date">
                                    {"Start date: " + this.getProcessedDate(this.state.Experiences.StartDate)}
                                </div>
                                <div className="profile-experience-date">
                                    {"End date: " + this.getProcessedDate(this.state.Experiences.EndDate)}
                                </div>
                                <div className="profile-experience-discription">
                                    {this.state.Experiences.Description}
                                </div>
                            </div>
                            <div className="profile-experience-card-divider"></div>
                        </div>
                    </div>
                </div>
            </Styles>
        );
    };
}

export default StudentProfileExperienceCard;