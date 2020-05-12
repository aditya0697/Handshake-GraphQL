import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProfilePhotoCard from './ProfilePhotoCard';
import ProfileSkills from './ProfileSkills';
import ProfileContactInfoCard from './ProfileContactInfoCard';
import ProfileCareerObjectiveCard from './ProfileCareerObjectiveCard';
import ProfileEducationCard from './ProfileEducationCard';
import ProfileExperienceCard from './ProfileExperienceCard';
import { getStudentDetailsQuery, getEmployerDetailsQuery } from '../../queries/queries';
import { graphql, Query } from 'react-apollo';
import { flowRight as compose } from 'lodash';


const Styles = styled.div`
.col-md-8, .col-md-4 {
    padding: 0px;
   
  }
  .profile-dashboard-sidebar-col{
    // border-right: 1px solid #d9d9d9;
  }

  .profile-dashboard-background{
      height: 585px;
      padding-right: 15px;
      padding-left: 15px;
    //   box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
      background-color: #fff;
      border-radius: 3px;
      
  }
  .profile-sidebar-backgroung{
    height: 585px;
    margin: 0 auto;
  }
  .profile-sidebar-divider {
      height:20px;
  }
  `;

class ProfileDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.studentId,
            student: null,
            employer: null,
        }
    }


    ShowStudentDetails = () => {
        var name = localStorage.getItem("Name");
        if (!name) {
            name = "";
        }
        var data = this.props.getStudentDetailsQuery;
        console.log("data", data);
        if (data.loading) {
        } else {
            if (data.student) {
                this.setState({
                    student: data.student
                })
            }
        }

    }

    ShowEmployerDetails = () => {
        var name = localStorage.getItem("Name");
        if (!name) {
            name = "";
        }
        var data = this.props.getEmployerDetailsQuery;
        console.log(" Employer data", data.employer);
        if (data.loading) {
        } else {
            if (data.employer) {
                console.log(" Employer data", data);
                this.setState({
                    employer: data.employer
                })
            }
        }

    }



    render() {
        if (this.state.student === null && localStorage.getItem("Type") === 'student') {
            this.ShowStudentDetails();
        }
        if (this.state.employer === null && localStorage.getItem("Type") === 'employer') {
            this.ShowEmployerDetails();
            return <div>
                Loading
            </div>
        }
        if (localStorage.getItem("Type") === "student" && this.state.student) {
            return (
                <Styles>
                    <div className="profile-dashboard-background">
                        <Row>
                            <Col sm={3} md={3} className="profile-dashboard-sidebar-col">
                                <div className="profile-sidebar-backgroung">
                                    <ProfilePhotoCard student={this.state.student}  />
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileContactInfoCard student={this.state.student}  employer={this.state.employer}/>
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                            <Col sm={8} md={8}>
                                <div className="">
                                    <ProfileCareerObjectiveCard CareerObjective={this.state.student.CareerObjective}  />
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileEducationCard Educations={this.state.student.Educations} />
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileExperienceCard Experiences={this.state.student.Experiences} />
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Styles>
            )
        } else if (localStorage.getItem("Type") === "employer" && this.state.employer != null) {
            return (
                <Styles>
                    <div className="profile-dashboard-background">
                        <Row>
                            <Col sm={3} md={3} className="profile-dashboard-sidebar-col">
                                <div className="profile-sidebar-backgroung">
                                    <ProfilePhotoCard employer={this.state.employer}/>
                                    <div className="profile-sidebar-divider"></div>
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileContactInfoCard employer={this.state.employer}/>
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                            <Col sm={8} md={8}>
                                <div className="">
                                    <ProfileCareerObjectiveCard Description={this.state.employer.EmployerDescription} />
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Styles>
            )
        } else {
            return (
                <div>
                    Loading {localStorage.getItem("Type")} details...
                </div>
            );
        }


    }
}


const mapStateToProps = state => {

    return {
        user: state.auth,
    };
};
//Export The Main Component
export default compose(
    graphql(getStudentDetailsQuery, {
        name: "getStudentDetailsQuery",
        options: (props) => {
            if (localStorage.getItem("Type") === 'student') {
                return ({ variables: { id: localStorage.getItem("id") } })
            }
        }
    }),
    graphql(getEmployerDetailsQuery, {
        name: "getEmployerDetailsQuery",
        options: (props) => {
            if (localStorage.getItem("Type") === 'employer') {
                return ({ variables: { id: localStorage.getItem("id") } })
            }
        }
    }),
)(ProfileDashBoard);