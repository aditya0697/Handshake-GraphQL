import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Pagination, Modal, ListGroup, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getConversationsForUser } from './../../redux/selectors';
import { getConversations } from './../../redux/actions/messageAction';
import MessageCard from './MessageCard';
import ChatBox from './ChatBox';
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
.message-title{
    height: 45px;
    margine: 10px;
    padding-left:10px;
    padding-top:10px;
}
  `;

class MessageDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            totalPages: 1,
            limit: 5,
            totalDocs: null,
            Conversations: [],
            currentConversation: [],
            currentId: 0,
        }
    }

    handlePageNext = (e) => {
        e.preventDefault();
        this.props.getConversations(this.props.user, this.props.messageData, this.state.nextPage, this.state.limit);
    }

    handlePagePrevious = (e) => {
        e.preventDefault();
        this.props.getConversations(this.props.user, this.props.messageData, this.state.prevPage, this.state.limit);
    }
    handlePageLast = (e) => {
        e.preventDefault();
        this.props.getConversations(this.props.user, this.props.messageData, this.state.totalPages, this.state.limit);
    }

    handlePageFirst = (e) => {
        e.preventDefault();
        this.props.getConversations(this.props.user, this.props.messageData, 1, this.state.limit);
    }

    componentDidMount() {
        this.props.getConversations(this.props.user, this.props.messageData, this.state.activePage, this.state.limit);
        if (this.props.Conversations) {
            this.setState({
                Conversations: this.props.Conversations,
            })
            if (this.props.Conversations) {
                this.setState({
                    currentConversation: this.props.Conversations[0],
                })
            }
            if (this.props.messageData) {
                this.setState({
                    totalDocs: this.props.messageData.totalDocs,
                    totalPages: this.props.messageData.totalPages,
                    limit: this.props.messageData.limit,
                    nextPage: this.props.messageData.nextPage,
                    prevPage: this.props.messageData.prevPage,
                    activePage: this.props.messageData.page,
                });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Conversations) {
            console.log("conversation updated in messageDashBoard",this.state.currentId);
            if(this.state.currentId == 0){
                this.setState({
                    currentConversation: null,
                })
            }
            this.setState({
                currentConversation: nextProps.Conversations[this.state.currentId],
            })
        }
        if (nextProps.messageData.page) {

            this.setState({
                Conversations: nextProps.Conversations,
                totalDocs: nextProps.messageData.totalDocs,
                totalPages: nextProps.messageData.totalPages,
                limit: nextProps.messageData.limit,
                nextPage: nextProps.messageData.nextPage,
                prevPage: nextProps.messageData.prevPage,
                activePage: nextProps.messageData.page,
            });
        }
    };

    messageCardClickHandler = (id) => {
        console.log("Conversation id: ", id);
        this.setState({
            currentConversation: this.state.Conversations[id],
            currentId: id,
        })
        // console.log("discription_job: " + JSON.stringify(this.state.discription_job));
    }

    render() {
        let messageSideBar = [];
        if (this.state.Conversations) {
            messageSideBar = this.state.Conversations.map((conversation, id) => {
                if (!conversation) {
                    return;
                }
                return (
                    <ListGroup.Item as="li" className="job-list-item">
                        <MessageCard conversation={conversation} id={id} messageCardClickHandler={this.messageCardClickHandler} />
                    </ListGroup.Item>
                )
            });
        };

        return (
            <Styles>
                <div className="dashboard-background" id="employer_modal">
                    <Row>
                        <Col sm={4} md={4} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <div className="job-sidebar-job-list">
                                        <Col>
                                            <div className="message-title">
                                                <span><b>Messages</b></span>
                                            </div>
                                        </Col>
                                        <ListGroup as="ul" className="job-list-group">
                                            {messageSideBar}
                                        </ListGroup>
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
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            <div className="">
                                {this.state.currentConversation &&
                                    <ChatBox conversation={this.state.currentConversation}  id={this.state.currentId}/>
                                }
                            </div>

                        </Col>
                    </Row>
                </div>
            </Styles>
        )
    }
}
//Export The Main Component

const mapStateToProps = state => {
    return {
        Conversations: getConversationsForUser(state.messageData),
        messageData: state.messageData,
        user: state.auth,
    };
};
export default connect(mapStateToProps, { getConversations })(MessageDashBoard);