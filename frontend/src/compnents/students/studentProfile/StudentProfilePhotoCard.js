import React, { Component } from 'react';
import { Row} from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';

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


class StudentProfilePhotoCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
           Education: this.props.Education,
           Name: this.props.FirstName + "  " + this.props.LastName,
           ProfileUrl: this.props.ProfileUrl,
        }
    };
   
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
                        <div className="profile-photo">
                            <Avatar name={this.state.Name}  src={this.state.ProfileUrl} size={95} round={true} />
                        </div>
                    </Row>
                    <Row>
                           <div class="profile-centered-div">
                                <div className="profile-name-text">{this.state.Name}<br /></div>
                                {this.state.Education && <div className="profile-university-text">{this.state.Education.School}<br /></div>}
                                {this.state.Education && <div className="profile-university-text">{this.state.Education.Level}  •  {this.state.Education.Major}<br /></div>}
                                {this.state.Education && <div className="profile-graduates-text">Graduates on {this.getProcessedDate(this.state.Education.GradDate)}<br /></div>}
                                {this.state.Education && <div className="profile-graduates-text">{this.state.Education.Level}  • {this.state.Education.GPA}<br /></div>}
                            </div>
                    </Row>
                </div>
            </Styles>
        )
    }
}

export default StudentProfilePhotoCard;