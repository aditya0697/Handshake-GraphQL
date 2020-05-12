import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, ListGroup,InputGroup,FormControl, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { List } from 'antd';
import { connect } from 'react-redux';
import {getSkills} from './../../redux/selectors';
import { updateStudentProfile } from './../../redux/actions/studentActions'

const Styles = styled.div`
   .profile-skills-card {
        height: 300px;
        max-height: 350px;
        width: 210;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }

   .profile-skills-skill {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 550;
    height: 30px;
   }
   .profile-skills-skillset {
       max-height: 175px;
       margin: 0 auto;
       overflow-y: scroll;
   }

   .profile-skill-addskill {
     height: 20px;
     padding-top: 15px;
   }
   .profile-skill-skillname {
     height: 18px;
     font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
     font-size: 14px;
     font-weight: 150;
   }
`;

class ProfileSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skill: "",
        }
    }
    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    saveChangeHandler = (e) => {
        console.log("Inside saveChangeHandler: "+this.state.skill);
        e.preventDefault();
        if (this.state.skill){
            this.props.skills.push(this.state.skill);
            const data = {
                Skills: this.props.skills,
            }
            this.props.updateStudentProfile(this.props.studentData, data);
        }
        this.setState({
            skill:""
        });
    }

    render() {
        let skillset = []
        if(this.props.skills){
            skillset = this.props.skills.map(skill => {
                return (
                    <div className ="profile-skill-skillname " >{skill}</div>
                )
            })
        }
        
        return (
            <Styles>
                <div className="profile-skills-card">
                    <div className="profile-skills-skill">
                        Skills
                    </div>
                    <div className="profile-skills-skillset">
                        {skillset}
                    </div>
                    <div className=" profile-skill-addskill">
                        <InputGroup className="mb-3">
                            <FormControl
                                name="skill"
                                placeholder="Add more skills"
                                value={this.state.skill}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={this.onValueChangeHandler}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-dark" onClick={this.saveChangeHandler} >Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
            </Styles>

        );
    };
}

const mapStateToProps = state => { 
    return { 
        skills: getSkills(state.student.studentData),
        studentData: state.student.studentData,
    };
  };

export default  connect(mapStateToProps, { updateStudentProfile })(ProfileSkills);