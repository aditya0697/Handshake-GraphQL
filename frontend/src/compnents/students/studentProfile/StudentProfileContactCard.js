import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
   .profile-Contact-card {
        max-height: 400px;
        overflow-y: scroll;
        width: 210;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-contact-contact{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 550;
    height: 30px;
   }
   .profile-contact-type{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 14px;
    font-weight: 550;
    height: 20px;
   }
   .profile-contact-value{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 12px;
    font-weight: 150;
    height: 20px;
   }
`;

class StudentProfileContactCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email: this.props.Email,
            PhoneNumber: this.props.PhoneNumber
        }
    }
    
    render() {

        return (
            <Styles>
                <div className="profile-Contact-card">
                    <div className="profile-contact-contact">
                        <Row>
                                Contact Information
                        </Row>
                    </div>
                    <div className="profile-contact-type">
                        Email Address
                    </div>
                    <div className="profile-contact-value">
                        {this.state.Email}
                    </div>
                    <div className="profile-contact-type">
                        Phone Number
                    </div>
                    <div className="profile-contact-value">
                        {this.state.PhoneNumber}
                    </div>
                </div>
            </Styles>

        );
    };
}

export default StudentProfileContactCard;