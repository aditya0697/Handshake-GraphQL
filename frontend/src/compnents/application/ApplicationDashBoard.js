import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Pagination } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getApplications } from '../../redux/selectors';
import { fetchApplications } from '../../redux/actions/applicationAction';
import ApplicationCard from './ApplicationCard';
import { getApplicationsQuery } from '../../queries/queries';
import { addApplication } from '../../mutations/mutations';
import { graphql, Query } from 'react-apollo';
import { flowRight as compose } from 'lodash';

const Styles = styled.div`
.col-md-8, .col-md-4 {
    padding: 0px;
   
  }
  .job-dashboard-sidebar-col{
    border-right: 1px solid #d9d9d9;
  }

  .dashboard-background{
      height: 585px;
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
    height: 535px;
   }
`;


class ApplicationDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertFlag: false,
            Type: "Full Time",
            applications: [],
            Deadline: new Date(),
            PostDate: new Date(),
            ErroFlag: false,
            // ApplicationsListView: [],
        }
    }

    

    ShowApplicationList = () => {
        var data = this.props.getApplicationsQuery;
        if (data.loading) {

        } else {
            console.log("data", data.application);
            if (data.application) {
                if (data.application.length < 1) {
                    this.setState({
                        ErroFlag: true,
                    })
                } else {
                    this.setState({
                        applications: data.application,
                        ErroFlag: false,
                    })
                }
            } else {
                this.setState({
                    ErroFlag: true,
                })
            }
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

    render() {
        let ApplicationsListView = [];
        if (!this.state.ErroFlag && this.state.applications.length < 1) {
            this.ShowApplicationList();
        }
        if (!this.state.applications == []) {
            // console.log("Applications: " + JSON.stringify(this.state.applications));
            ApplicationsListView  = this.state.applications.map((application, id) => {
                if (!application) {
                    return;
                }
                return (
                    <ApplicationCard application={application} id={id} jobCardClickHandler={this.jobCardClickHandler} />
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
                                            <span><b> Applied for {this.state.totalDocs && this.state.totalDocs} Jobs </b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">

                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="application-list-view">
                                {ApplicationsListView}
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

export default compose(
    graphql(getApplicationsQuery, {
        name: "getApplicationsQuery",
        options: (props) => {
            if (localStorage.getItem("Type") === 'employer') {
                return ({ variables: { EmployerID: localStorage.getItem("id"), StudentID: "" } })
            }
            return ({ variables: {EmployerID: "", StudentID: localStorage.getItem("id") } })
        }
    }),

    graphql(addApplication, { name: "addApplication", 
        options:{
            refetchQueries: [{ query: getApplicationsQuery, variables: { EmployerID: "", StudentID: localStorage.getItem("id") } }]
    }  })
)
(ApplicationDashBoard);