import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { ListGroup, Col, } from 'react-bootstrap';
import JobCard from './JobCard';
import { Affix } from 'antd';


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
`;

class JobSidebar extends Component {
    render() {
        return (
            <Styles>
                <div className="job-sidebar-container">
                    
                    <ListGroup as="ul" className="job-list-group">
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className="job-list-item">
                            <JobCard />
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </Styles>
        )
    }
}
//Export The Main Component
export default JobSidebar;