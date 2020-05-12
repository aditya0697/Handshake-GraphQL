import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
   .profile-objective-card {
        max-height: 550px;
        overflow-y: scroll;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-objective-title{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 550;
    height: 30px;
   }
   
   .profile-objective-value{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 16px;
    font-weight: 150;
    min-height: 20px;
   }
`;

class StudentProfileObjectiveCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName : this.props.FirstName,
            CareerObjective : this.props.CareerObjective,
        }
    }

    render() {

        return (
            <Styles>
                <div className="profile-objective-card ">
                    <div className="profile-objective-title">
                        <Row>
                            <Col xs={11} md={11}>
                                    <div>{this.state.FirstName}'s Journey.</div>
                            </Col>
                        </Row>
                    </div>
                        <div className="profile-objective-value">
                            {this.state.CareerObjective}
                        </div>
                </div>
            </Styles>

        );
    };
}

export default StudentProfileObjectiveCard;