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
    render() {
        if(this.props.user.user_type === "student"){
            return (
                <Styles>
                    <div className="profile-dashboard-background">
                        <Row>
                            <Col sm={3} md={3} className="profile-dashboard-sidebar-col">
                                <div className="profile-sidebar-backgroung">
                                    <ProfilePhotoCard/>
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileSkills/>
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileContactInfoCard/>
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                            <Col sm={8} md={8}>
                                <div className="">
                                    <ProfileCareerObjectiveCard/>
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileEducationCard/>
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileExperienceCard/>
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Styles>
            )
        }else if(this.props.user.user_type === "employer"){
            return (
                <Styles>
                    <div className="profile-dashboard-background">
                        <Row>
                            <Col sm={3} md={3} className="profile-dashboard-sidebar-col">
                                <div className="profile-sidebar-backgroung">
                                    <ProfilePhotoCard/>
                                    <div className="profile-sidebar-divider"></div>
                                    <div className="profile-sidebar-divider"></div>
                                    <ProfileContactInfoCard/>
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                            <Col sm={8} md={8}>
                                <div className="">
                                    <ProfileCareerObjectiveCard/>
                                    <div className="profile-sidebar-divider"></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Styles>
            )
        }else{
            return(
                <div>
                Error
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
export default connect(mapStateToProps,{})(ProfileDashBoard);