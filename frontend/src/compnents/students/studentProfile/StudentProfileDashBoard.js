import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import StudentProfilePhotoCard from './StudentProfilePhotoCard';
import StudentProfileSkills from './StudentProfileSkills';
import StudentProfileContactCard from './StudentProfileContactCard';
import StudentProfileObjectiveCard from './StudentProfileObjectiveCard';
import StudentProfileEducationCard from './StudentProfileEducationCard';
import StudentProfileExperienceCard from './StudentProfileExperienceCard';
import { getStudentDetailsQuery } from '../../../queries/queries';
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

class StudentProfileDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentId: this.props.studentId,
            student: null,
        }
    }

    componentDidMount = async () =>  {
        
    }

    ShowStudentDetails = () => {
        var name = localStorage.getItem("Name");
        if (!name) {
            name = "";
        }
        var data =  this.props.getStudentDetailsQuery;
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

    render() {
        if (!this.state.student) {
            this.ShowStudentDetails();
            return (
                <div style={{ width: "100%" }}>
                    <Row>
                        <Col sm={4} md={4} >
                        </Col>
                        <Col sm={6} md={6}>
                            <div>Loading Student details...</div>
                        </Col>
                    </Row>
                </div>);
        }
        return (
            <Styles>
                <div className="profile-dashboard-background">
                    <Row>
                        <Col sm={3} md={3} className="profile-dashboard-sidebar-col">
                            <div className="profile-sidebar-backgroung">
                                <StudentProfilePhotoCard Education={this.state.student.Educations[0]} FirstName={this.state.student.FirstName} LastName={this.state.student.LastName} ProfileUrl={this.state.student.ProfileUrl} />
                                <div className="profile-sidebar-divider"></div>
                                <div className="profile-sidebar-divider"></div>
                                <StudentProfileContactCard Email={this.state.student.Email} PhoneNumber={this.state.student.PhoneNumber} />
                                <div className="profile-sidebar-divider"></div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="">
                                <StudentProfileObjectiveCard FirstName={this.state.student.FirstName} CareerObjective={this.state.student.CareerObjective} />
                                <div className="profile-sidebar-divider"></div>
                                <StudentProfileEducationCard Educations={this.state.student.Educations} />
                                <div className="profile-sidebar-divider"></div>
                                <StudentProfileExperienceCard Experiences={this.state.student.Experiences} />
                                <div className="profile-sidebar-divider"></div>
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
        user: state.auth,
    };
};
//Export The Main Component
export default compose(
    graphql(getStudentDetailsQuery, { 
        name: "getStudentDetailsQuery",
        options:  (props) => {
            console.log("Prpos", props.studentId)
           return ({ variables: { id: props.studentId } })
        }
        
 }))(StudentProfileDashBoard);