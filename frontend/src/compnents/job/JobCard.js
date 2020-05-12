import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfileUrlForEmployer } from './../../redux/actions/profilePictureActions';
import { getProfilePicture } from '../../redux/selectors';

const Styles = styled.div`
   .job-card-postion-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 14px;
        font-weight: 500;
        overflow-x: scroll;
   }
   .job-card-company-name {
    font-size: 12px;
    font-weight: 300;
    overflow-x: scroll;
   }
   .job-card-jobtype {
    font-size: 12px;
    font-weight: 400;
    overflow-x: scroll;
   }
`;


class JobCard extends Component {

    constructor(props) {
        super(props);
        if (this.props.job) {
            this.state = {
                show: false,
                apply_show: false,
                _id: this.props.job._id,
                EmployerName: this.props.job.EmployerName,
                Postion: this.props.job.Postion,
                City: this.props.job.Address.City,
                State: this.props.job.Address.State,
                Zipcode: this.props.job.Address.Zipcode,
                Type: this.props.job.Type,
                Salary: this.props.job.Salary,
                PostDate: this.props.job.PostDate,
                Deadline: this.props.job.Deadline,
                Description: this.props.job.Description,
                EmployerProfileUrl: this.props.job.EmployerProfileUrl,
            }
        }
        this.clickHandler = this.clickHandler.bind();
    }
    clickHandler = (e) => {
        e.preventDefault();
        this.props.jobCardClickHandler(this.props.id);
    }

    componentWillReceiveProps(nextProps) {
        // console.log("nextProps.job: " + JSON.stringify(nextProps.job));
        if (nextProps.job) {
            this.setState({
                EmployerName: nextProps.job.EmployerName,
                Postion: nextProps.job.Postion,
                City: nextProps.job.Address.City,
                State: nextProps.job.Address.State,
                Zipcode: nextProps.job.Address.Zipcode,
                Type: nextProps.job.Type,
                Salary: nextProps.job.Salary,
                PostDate: nextProps.job.PostDate,
                Deadline: nextProps.job.Deadline,
                Description: nextProps.job.Description,
                EmployerProfileUrl: nextProps.job.EmployerProfileUrl,
            })
        }
    }
    render() {
        if (!this.props.job) {
            return (
                <div></div>
            );
        }
        return (
            <Styles>
                <Container onClick={this.clickHandler}>
                    <Row>
                        <Col sd={4} md={4}>
                            <Avatar name={this.state.EmployerName} src={this.state.EmployerProfileUrl} size={50} round={false} />
                        </Col>
                        <Col sd={8} md={8}>
                            <div className="job-card-postion-name">
                                <span><b>{this.state.Postion}</b></span>
                            </div>
                            <div className="job-card-company-name">
                                <span><a href="">{this.state.EmployerName} - {this.state.City}, {this.state.State}</a></span>
                            </div>
                            <div className="job-card-jobtype">
                                <span>{this.state.Type}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps, { getProfileUrlForEmployer })(JobCard);