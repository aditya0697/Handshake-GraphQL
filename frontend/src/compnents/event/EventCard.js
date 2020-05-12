import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfileUrlForEmployer } from './../../redux/actions/profilePictureActions';
import { getProfilePicture, getEvents } from '../../redux/selectors';

const Styles = styled.div`
   .job-card-postion-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 20px;
        font-weight: 700;
   }
   .job-card-company-name {

   }
   .job-card-jobtype {

   }
`;


class EventCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            EmployerName: this.props.event.EmployerName,
            EventName: this.props.event.EventName,
            EmployerProfileUrl: this.props.event.EmployerProfileUrl,
            Address: this.props.event.Address,
            Majors: this.props.event.Majors,
            Description: this.props.event.Description,
            EventDate: this.props.event.post_date,
            show: false,
            apply_show: false,
        }
        this.clickHandler = this.clickHandler.bind();
    }
    clickHandler = (e) => {
        e.preventDefault();
        this.props.eventCardClickHandler(this.props.id);
    }
    componentWillReceiveProps(nextProps) {
        // console.log("nextProps.job: " + JSON.stringify(nextProps.job));
        if (nextProps.event) {
            this.setState({
                EmployerName: nextProps.event.EmployerName,
                EventName: nextProps.event.EventName,
                EmployerProfileUrl: nextProps.event.EmployerProfileUrl,
                Address: nextProps.event.Address,
                Majors: nextProps.event.Majors,
                Description: nextProps.event.Description,
                EventDate: nextProps.event.post_date,
            })
        }
    }
    render() {
        return (
            <Container onClick={this.clickHandler}>
                <Row>
                    <Col sd={4} md={4}>
                        <Avatar name={this.state.EmployerName} src={this.state.EmployerProfileUrl} size={50} round={false} />
                    </Col>
                    <Col sd={8} md={8}>
                        <div className="job-card-postion-name">
                            <span><b>{this.state.EventName}</b></span>
                        </div>
                        <div className="job-card-company-name">
                            <span><a href="">{this.state.EmployerName}</a></span>
                        </div>
                        <div className="job-card-jobtype">
                            <span>On {(new Date(this.state.EventDate)).toDateString()}</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth,
       
    };
};

export default connect(mapStateToProps, { getProfileUrlForEmployer })(EventCard);