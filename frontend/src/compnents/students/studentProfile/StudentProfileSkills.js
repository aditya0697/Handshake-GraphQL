import React, { Component } from 'react';
import styled from 'styled-components';


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

class StudentProfileSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skills: this.props.Skills,
        }
    }

    render() {
        let skillset = []
        if(this.state.skills){
            skillset = this.state.skills.map(skill => {
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
                </div>
            </Styles>
        );
    };
}

export default  StudentProfileSkills;