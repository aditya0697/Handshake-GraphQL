import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ChatBox from './ChatBox';


const Styles = styled.div`
   .Message-card-name {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 20px;
        font-weight: 500;
        overflow-x: scroll;
   }
   .Message-card-type {
    font-size: 16px;
    font-weight: 300;
    overflow-x: scroll;
   }
   .job-card-jobtype {
    font-size: 12px;
    font-weight: 400;
    overflow-x: scroll;
   }
`;


class MessageCard extends Component {

    constructor(props) {
        super(props);
        if (this.props.conversation) {
            this.state = {
                show: false,
                apply_show: false,
                Persons: this.props.conversation.Persons,
                Messages: this.props.conversation.Messages,
                Time: this.props.Time,
            }
        }
        this.clickHandler = this.clickHandler.bind();
    }

    getPersonType = () => {
        if (this.props.user.id != this.state.Persons[0].PersonId) {
            return this.state.Persons[0].PersonType;
        } else {
            return this.state.Persons[1].PersonType;
        }
    }

    getName = () => {
        if (this.props.user.id != this.state.Persons[0].PersonId) {
            return this.state.Persons[0].Name;
        } else {
            return this.state.Persons[1].Name;
        }
    }

    getProfileUrl = () => {
        if (this.props.user.id != this.state.Persons[0].PersonId) {
            return this.state.Persons[0].PersonProfileUrl;
        } else {
            return this.state.Persons[1].PersonProfileUrl;
        }
    }


    clickHandler = (e) => {
        e.preventDefault();
        this.props.messageCardClickHandler(this.props.id);
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProps.conversation: " + JSON.stringify(nextProps.conversation));
        if (nextProps.conversation) {
            this.setState({
                Persons: nextProps.conversation.Persons,
                Messages: nextProps.conversation.Messages,
            });
        }
    }
    render() {
        if (!this.state.Messages) {
            return (
                <div></div>
            );
        }
        return (
            <Styles>
                <Container onClick={this.clickHandler}>
                    <Row>
                        <Col sd={4} md={4}>
                            <Avatar name={this.getName()} src={this.getProfileUrl()} size={70} round={true} />
                        </Col>
                        <Col sd={8} md={8}>
                            <div className="Message-card-name">
                                <span><b>{this.getName()}</b></span>
                            </div>
                            <div className="Message-card-type">
                                <span>{this.getPersonType()}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Styles>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

export default connect(mapStateToProps, {})(MessageCard);