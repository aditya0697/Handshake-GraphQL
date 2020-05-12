import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Pagination } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getRegistrationsFormStore } from '../../redux/selectors';
import { getRegistrations } from '../../redux/actions/registrationActions';
import RegistrationCard from './RegistrationCard';

const Styles = styled.div`
.col-md-8, .col-md-4 {
    padding: 0px;
   
  }
  .job-dashboard-sidebar-col{
    border-right: 1px solid #d9d9d9;
  }

  .dashboard-background{
      height: 565px;
      padding-right: 15px;
      padding-left: 15px;
      box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
      background-color: #fff;
      border-radius: 3px;
      
  }
  .sidebar-backgroung{
    height: 585px;
    margin: 0 auto;
  }

  .job-discription-card {
    max-height: 800px;
    overflow-y: scroll;
    margin: 10px;
    padding: 24px;
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
    background-color: #fff;
    border-radius: 3px;
    }
    .job-create-job{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 20px;
    min-width: 675px;
    font-weight: 550;
    height: 30px;
   }
.job-sidebar-container{
    margin: 0 auto;
    overflow-x: scroll;
    height: 585px;
}
.job-list-group {
    border: 0px;
}
.job-list-item {
    border: 0px;
    &:hover {
        border-left: 4px solid #b3b3b3;
        background-color: #f2f2f2
    }
}
.jobs-pagination{
    text-align: center;
        overflow-x: scroll;
        padding-left: 15px;
}
.job-sidebar-job-list{
    height: 535px;
    overflow-y: scroll;
}
   .apllication-dashboard-padding{
        height: 20px;
        margin: 10px auto;
        paddinng: 10px;
   }
   .application-list-view{
    margin: 0 auto;
    padding: 10px;
    width: 800px;
    overflow-y: scroll;
    height: 500px;
   }
`;


class RegistrationDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertFlag: false,
            Type: "Full Time",
            activePage: 1,
            totalPages: 1,
            limit: 5,
            totalDocs: 0,
            registrations: [],
            // ApplicationsListView: [],
        }
        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.jobCardClickHandler = this.jobCardClickHandler.bind(this);
    }

    handlePageNext = (e) => {
        e.preventDefault();
        this.props.getRegistrations(this.props.user, this.props.registrationData, this.state.nextPage, this.state.limit);
    }

    handlePagePrevious = (e) => {
        e.preventDefault();
        this.props.getRegistrations(this.props.user, this.props.registrationData, this.state.prevPage, this.state.limit);
    }
    handlePageLast = (e) => {
        e.preventDefault();
        this.props.getRegistrations(this.props.user, this.props.registrationData, this.state.totalPages, this.state.limit);
    }

    handlePageFirst = (e) => {
        e.preventDefault();
        this.props.getRegistrations(this.props.user, this.props.registrationData, 1, this.state.limit);
    }

    componentDidMount() {
        this.props.getRegistrations(this.props.user, this.props.registrationData, this.state.activePage, this.state.limit);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.registrationData.page) {
            this.setState({
                registrations: nextProps.registrations,
                totalDocs: nextProps.registrationData.totalDocs,
                totalPages: nextProps.registrationData.totalPages,
                limit: nextProps.registrationData.limit,
                nextPage: nextProps.registrationData.nextPage,
                prevPage: nextProps.registrationData.prevPage,
                activePage: nextProps.registrationData.page,
            });
        }
    }
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
    registrationCardClickHandler = (id) => {
        console.log("Register id: ", id);
        this.setState({
            discription_event: this.props.events[id],
        })
        // console.log("discription_event: " + JSON.stringify(this.state.discription_event));
    };

    render() {
        let RegistrationsListView = [];
        if (this.state.registrations) {
            console.log(" in registrations: " + JSON.stringify(this.props.registrations));
            RegistrationsListView  = this.state.registrations.map((registration, id) => {
                if (!registration) {
                    return;
                }
                console.log("registration: ",JSON.stringify(registration));
                return (
                    <RegistrationCard registration={registration} id={id} jobCardClickHandler={this.jobCardClickHandler} />
                )
            });
        };

        return (
            <Styles>
                <div>
                    <Row>
                        <Col sm={3} md={3} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <Col>
                                        <div className="jobs-details">
                                            <br></br>
                                            <span><b> Registered for {this.state.totalDocs} Events </b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">
                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="application-list-view">
                                {RegistrationsListView}
                            </div>
                            <div className="jobs-pagination">
                                <Pagination >
                                    <Pagination.First onClick={this.handlePageFirst} />
                                    <Pagination.Prev onClick={this.handlePagePrevious} />
                                    <Pagination.Item key={this.state.activePage} active={true}>
                                        {this.state.activePage}
                                    </Pagination.Item>
                                    <Pagination.Next onClick={this.handlePageNext} />
                                    <Pagination.Last onClick={this.handlePageLast} />
                                </Pagination>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Styles>
        )
    }
}
const mapStateToProps = state => {
    return {
        registrations: getRegistrationsFormStore(state),
        user: state.auth,
        registrationData: state.registrationData,
    };
};
export default connect(mapStateToProps, { getRegistrations })(RegistrationDashBoard);