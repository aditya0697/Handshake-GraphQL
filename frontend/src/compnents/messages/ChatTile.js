import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Row, Col, Modal, Form, Button, Container, InputGroup, ListGroup } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeApplicationStatus } from '../../redux/actions/applicationAction';

const Styles = styled.div`
   
   .message-holder-1{
       padding: 10px;
       max-width: 450px;
       min-width:70px;
       border-radius: 25px;
       border-right: 4px solid #b3b3b3;
       background-color: #e0e0e0;
       color: #212121;

   }
   .message-holder{
    max-width: 550px;
    padding-right: 15px; 
    padding-left: 15px; 
   }
   .message-holder-0{
        padding: 10px;
        max-width: 550px;
        min-width: 50px;
        border-radius: 25px;
        border-left: 4px solid #1565c0;
        background-color: #2196f3;
       color: #e3f2fd;
   }
   .chat-message-list-item {
    border: 0px;
}
   
`;


class ChatTile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Name: "Aditya Patel",
            PersonProfileUrl: "",
            message: "Hello",
        }
    }
    componentDidMount() {
        if (this.props.onRender) {
            this.props.onRender(this)
        }
    }

    render() {
        if (this.props.orientation == 1) {
            return (
                <Styles>
                    <ListGroup.Item as="li" className="chat-message-list-item">
                        <Row>
                            <Col sm={1} md={1}>
                                <Avatar name={this.props.Name} src={this.props.PersonProfileUrl} size={40} round={true} />
                            </Col>
                            <Col sm={8} md={8}>
                                <InputGroup>
                                    <InputGroup.Prepend className="message-holder">
                                        <div className="message-holder-0">
                                            {this.props.message}
                                        </div>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Col>
                        </Row>
                        <div className="chat-divder"></div>
                    </ListGroup.Item>

                </Styles>
            )
        } else {
            return (
                <Styles>
                    <ListGroup.Item as="li" className="chat-message-list-item" >
                        <Row>
                            <Col sm={10} md={10} >
                                <InputGroup style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <InputGroup.Prepend>
                                        <div  className="message-holder-1">
                                            {this.props.message}
                                        </div>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Col>
                            <Col sm={2} md={2}>
                                <Avatar name={this.props.Name} src={this.props.PersonProfileUrl} size={40} round={true} />
                            </Col>
                        </Row>
                        <div className="chat-divder"></div>
                    </ListGroup.Item>

                </Styles>
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        user: state.auth,
        // job_profile_pic: getProfileUrlForEmployerForJob(state.job),
    };
};

export default connect(mapStateToProps, { changeApplicationStatus })(ChatTile);
