import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Pagination, Button, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getAllStudentsList } from '../../redux/selectors';
import { getAllStudents } from '../../redux/actions/studentTabAction';
import StudentCard from './StudentCard';
import StudentProfileDashBoard from './studentProfile/StudentProfileDashBoard';
import { getAllStudentQuery } from '../../queries/queries';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

const Styles = styled.div`
    .job-sidebar-container{
        margin: 0 auto;
        overflow-y: scroll;
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
    .jobs-details{
        height: 40px;
        margin: 10px auto;
        paddinng: 10px;
        padding-left: 15px;
        padding-right: 15px;
   }
   .apllication-dashboard-padding{
        height: 20px;
        margin: 10px auto;
        paddinng: 10px;
   }
   .student-card-container{
        margin: 10px auto;
   }
   .student-card-list-view{
        height: 525px;
        margin: 10px auto;
        paddinng: 10px;
        overflow-y: scroll;
   }
   .students-pagination{
        text-align: center;
        overflow-x: scroll;
        padding-left: 15px;
   }
   .student-profile-back-button{
        padding: 5px;
        padding-left: 15px;
        margin: 10px auto;
        height: 35px;
   }
   .student-profile{
        height: 525px;
        margin: 10px auto;
        overflow-y: scroll;
   }
`;


class StudentDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileView: false,
            selectedStudent: null,
            studentId: "",
            students_list: [],
        }
        // this.refreshClickListner = this.refreshClickListner.bind(this);
    }
    backClickListner = (e) => {
        e.preventDefault();
        this.setState({
            selectedStudent: "",
            profileView: false,
        });
    }

    studentCardClickHandler = (id) => {
        // console.log("Job id: ", id);
        this.setState({
            selectedStudent: this.state.students_list[id],
            studentId: id,
            profileView: true,
        })
        // console.log("discription_job: " + JSON.stringify(this.state.discription_job));
    }
    refreshClickListner = (e) => {
        e.preventDefault();
        this.props.getAllStudents();
    }
    ShowStudentList() {
        var name = localStorage.getItem("Name");
        if (!name) {
            name = "";
        }
        var data = this.props.getAllStudentQuery;
        console.log("data",data);
        if(data.loading){
            return( <div>Loading Students...</div> );
        } else {
            console.log("allStudents: ",data.allStudents);
            return data.allStudents.map((student,id) => {
                return(
                    <div className="student-card-container">
                        <StudentCard student={student} id={id} studentCardClickHandler={this.studentCardClickHandler} />
                    </div>
                );
            })
        }

    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        if (this.state.profileView) {
            return (

                <Styles>
                    <div>
                        <Row className="student-profile-back-button">
                            <Col sm={3} md={3} className="job-dashboard-sidebar-col">
                                <Icon type="arrow-left" style={{ fontSize: '28px' }} onClick={this.backClickListner} />
                            </Col>
                        </Row>
                        <Row className="student-profile">
                            <StudentProfileDashBoard studentId={this.state.studentId} />
                        </Row>
                    </div>
                </Styles>
            )
        }
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
                                            <span><b>Students</b></span>
                                        </div>
                                    </Col>
                                    <ListGroup as="ul" className="job-list-group">

                                    </ListGroup>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="student-card-list-view">
                                {this.ShowStudentList()}
                            </div>
                        </Col>
                    </Row>
                </div>
            </Styles>
        )
    }
}

export default  compose(
    graphql(getAllStudentQuery, {
        name:"getAllStudentQuery",
        options: (props) => {
            if (localStorage.getItem("Name")) {
                return ({ variables: { Name: localStorage.getItem("Email") } })
            }
            return ({ variables: {Name: ""} })
        } })
    )(StudentDashBoard);