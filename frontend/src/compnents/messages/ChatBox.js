import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom';
import { Row, Col, Button, Pagination, InputGroup, Form, ListGroup, Alert } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import JobDiscription from '../job/JobDiscription';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { getJobs } from '../../redux/selectors';
import { sendMessage } from '../../redux/actions/messageAction';
import ChatTile from './ChatTile';
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
.chat-window{
    width: 700px;
    height: 530px;
    overflow-y: scroll;
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
.chat-divder{
    height: 5px;
}
.message-sent-holder{
    padding: 10px;
    width: 550px;
    height: 55px;
    margin-left: 10px;
    margin-right: 20px;
    border-radius: 25px;
    background-color: #f2f2f2
}
.chat-send-button{
    border-radius: 25px;
}
  `;

class ChatBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Persons: this.props.conversation.Persons,
            Messages: this.props.conversation.Messages,
        }
        this.onRowRender = this.onRowRender.bind(this);
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.conversation){
            this.setState({
                Persons: nextProps.conversation.Persons,
                Messages: nextProps.conversation.Messages,
            });
        }
    };

    messageCardClickHandler = (id) => {
        console.log("Job id: ", id);
        // this.setState({
        //     discription_job: this.props.jobs[id],
        // })
        // console.log("discription_job: " + JSON.stringify(this.state.discription_job));
    }

    getName = (id) => {
        if (this.state.Persons[0].PersonId == id) {
            return this.state.Persons[0].PersonProfileUrl;
        } else {
            return this.state.Persons[1].PersonProfileUrl;
        }
    }

    getProfileUrl = (id) => {
        if (this.state.Persons[0].PersonId == id) {
            return this.state.Persons[0].PersonProfileUrl;
        } else {
            return this.state.Persons[1].PersonProfileUrl;
        }
    }

    getOrientation = (id) => {
        if (this.props.user.id == id) {
            return 0;
        } else {
            return 1;
        }
    }
    getReceiverId = () => {
        if (this.state.Persons[0].PersonId == this.props.user.id) {
            return this.state.Persons[1].PersonId;
        } else {
            return this.state.Persons[0].PersonId;
        }
    }

    onChangeHandeler = (e) => this.setState({ [e.target.name]: e.target.value });

    sendButtonHandler = (e) => {
        e.preventDefault();
        if (!this.state.newMessage) {
            return;
        }
        this.props.sendMessage(this.props.user.id,this.getReceiverId(),this.props.conversation._id,this.state.newMessage, this.props.id);
        this.setState({
            newMessage: "",
        });
    }


    onRowRender(row) {
        console.log("last chatTile called: ", JSON.stringify(row.props))
        var rowDOM = ReactDOM.findDOMNode(row);
        var parent = rowDOM.parentNode;
        parent.scrollTop = parent.scrollHeight;
    }

    render() {
        let chatBar = [];
        if (this.state.Messages) {
            chatBar = this.state.Messages.map((message, id) => {
                if (!message) {
                    return;
                }
                // const profileUrl = this.getName(message.SenderId);
                // var Name = this.getProfileUrl(message.SenderId);
                return (
                    <ChatTile
                        message={message.Message}
                        name={this.getName(message.SenderId)}
                        PersonProfileUrl={this.getProfileUrl(message.SenderId)}
                        orientation={this.getOrientation(message.SenderId)}
                        id={id} onRender={id === this.state.Messages.length - 1 ? this.onRowRender : null} 
                        />
                )
            });
        };

        return (
            <Styles>
                <div className="dashboard-background" id="employer_modal">
                    <Row >
                        <div class="chat-window">
                            {chatBar}
                        </div>
                    </Row>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Type a message"
                            name="newMessage"
                            onChange={this.onChangeHandeler}
                            value={this.state.newMessage}
                            
                        />
                        <InputGroup.Append>
                            <Button variant="primary" onClick={this.sendButtonHandler}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </Styles>
        )
    }
}
//Export The Main Component

const mapStateToProps = state => {
    return {
        user: state.auth,
    };
};
export default connect(mapStateToProps, {sendMessage})(ChatBox);