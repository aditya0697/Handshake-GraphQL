import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Button, Pagination, Modal, Form, ListGroup, Alert, Navbar, Nav, FormControl } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import JobSidebar from './JobSidebar';
import JobDiscription from './JobDiscription';
import DatePicker from "react-datepicker";
import JobCard from './JobCard';
import { getJobsQuery } from '../../queries/queries';
import { addJob } from '../../mutations/mutations';
import { graphql, Query } from 'react-apollo';
import { flowRight as compose } from 'lodash';


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
    height: 505px;
    overflow-y: scroll;
}
  `;

class JobDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertFlag: false,
            Type: "Full Time",
            jobs: [],
            Deadline: new Date(),
            PostDate: new Date(),
            Ascending_order: -1,
            ErroFlag: false,
            addJobFlag: false,
            // discription_job: initial_job,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.jobCardClickHandler = this.jobCardClickHandler.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }
    handleCheckBoxChange = (e) => {
        e.preventDefault();
        const item = e.target.name;
        const isChecked = e.target.checked;
        if (isChecked) {
            console.log("IsChecked: ", isChecked);
            this.setState({
                Ascending_order: 1
            });
            this.props.fetchJobs(this.props.user, this.props.jobData, 1, this.state.limit, this.props.user.id, 1);
        } else {
            console.log("IsChecked: ", isChecked);
            this.setState({
                Ascending_order: -1
            });
            this.props.fetchJobs(this.props.user, this.props.jobData, 1, this.state.limit, this.props.user.id, -1);
        }

    }
    // componentDidMount() {
    //     if (this.props.jobs === []) {
    //         this.props.getAllStudents();
    //     } 
    // }
    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps.students_list: " + JSON.stringify(nextProps.allStudents.page));

    // }

    handleClose = (e) => {
        this.setState({
            show: false,
            alertFlag: false,
        })
    };
    handleShow = (e) => {
        e.preventDefault();
        console.log("Inside handleShow");
        this.setState({
            show: true,
        })
    };

    ShowJobList = () => {
        var data = this.props.getJobsQuery;
        if (data.loading) {

        } else {
            console.log("data", data.job);
            if (data.job) {
                if (data.job.length < 1) {
                    this.setState({
                        ErroFlag: true,
                    })
                } else {
                    this.setState({
                        jobs: data.job,
                        ErroFlag: false,
                    })
                }
            } else {
                this.setState({
                    ErroFlag: true,
                })
            }
        }

    }

    onChangeHandeler = (e) => this.setState({ [e.target.name]: e.target.value });

    jobCardClickHandler = (id) => {
        console.log("Job id: ", id);
        this.setState({
            discription_job: this.state.jobs[id],
        })
        console.log("discription_job: " + JSON.stringify(this.state.discription_job));
    };
    postDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            PostDate: date,
        })
    };

    deadlineDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            Deadline: date,
        })
    };

    getUpdatedState = () => ({
        EmployerID: this.props.EmployerID,
        Postion: this.state.Postion,
        Type: this.state.Type,
        Salary: this.state.Salary,
        PostDate: this.state.PostDate,
        Deadline: this.state.Deadline,
        Description: this.state.Description,
        Address: {
            City: this.state.City,
            State: this.state.State,
            Zipcode: this.state.Zipcode,
        },
    });
    validation = () => {
        if (this.state.Postion && this.state.Type && this.state.City && this.state.State && this.state.Zipcode && this.state.Salary && this.state.Description) {
            return true;
        }
        return false;
    }

    addJobHandler = (e) => {

        e.preventDefault();
        if (!this.validation()) {
            this.setState({
                addJobModalAlertFlag: true,
            })
            return;
        }
        this.setState({
            show: false,
        })
        this.props.addJob({
            variables: {
                EmployerName: localStorage.getItem("EmployerName"),
                EmployerID: localStorage.getItem("id"),
                Postion: this.state.Postion,
                Salary: parseInt(this.state.Salary),
                Type: this.state.Type,
                PostDate: "",
                Deadline:"",
                City: this.state.City,
                State: this.state.State,
                Zipcode: String(this.state.Zipcode),
                Description: this.state.Description,
            }})
    
        window.location.reload();
    }

    saveChangeHandler = (e) => {
        if (!this.validation()) {
            this.setState({
                alertFlag: true,
            })
            return;
        }
        e.preventDefault();
        this.setState({
            show: false,
        })
        console.log("getUpdatedState: " + JSON.stringify(this.getUpdatedState()));
        // this.props.addJob(this.getUpdatedState(), this.props.user.email);

    }

    render() {

        if (!this.state.ErroFlag && this.state.jobs.length < 1) {
            this.ShowJobList();
        }
        let jobSidebar = [];
        if (this.state.jobs) {
            jobSidebar = this.state.jobs.map((job, id) => {
                if (!job) {
                    return;
                }
                return (
                    <ListGroup.Item as="li" className="job-list-item">
                        <JobCard job={job} id={id} jobCardClickHandler={this.jobCardClickHandler} />
                    </ListGroup.Item>
                )
            });
        } else {

            return (
                <div style={{ width: "100%" }}>
                    <Row>
                        <Col sm={4} md={4} >
                        </Col>
                        <Col sm={6} md={6}>
                            <div>Loading jobs...</div>
                        </Col>
                    </Row>
                </div>);
        }

        return (
            <Styles>
                <Navbar bg="light" expand="lg">
                    <Nav>

                    </Nav>
                    <Nav>
                        <Form inline>
                            <Form.Check type="checkbox"
                                name="A"
                                onChange={this.handleCheckBoxChange}
                                id={`default-checkbox`}
                                label="Ascending order of post"
                            />
                        </Form>
                    </Nav>
                </Navbar>
                <div className="dashboard-background" id="employer_modal">
                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Modal show={this.state.show} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Create Job</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.addJobModalAlertFlag && <Alert variant="danger">Insert all values</Alert>}
                            <Form>
                                <Form.Group controlId="employer">
                                    <Form.Label className="signup-form-lable">Job Postion</Form.Label>
                                    <Form.Control onChange={this.onChangeHandeler} name="Postion" placeholder="Job Postion" />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="start_date">
                                        <Form.Label className="signup-form-lable">Post Date</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.PostDate} name="PostDate" className="date_picker" onChange={this.postDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="salary">
                                        <Form.Label className="signup-form-lable">Salary</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="Salary" type="number" placeholder="salary" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label className="signup-form-lable">Application Deadline,</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.Deadline} name="Deadline" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                        <br />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Job Category </Form.Label>
                                        <Form.Control as="select" name="Type" onChange={this.onChangeHandeler} defaultValue={1}>
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                            <option>Intern</option>
                                            <option>On Campus</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control name="City" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control name="State" placeholder="CA" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control name="Zipcode" placeholder="12345" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name="Description" as="textarea" placeholder="Discription..." onChange={this.onChangeHandeler} />
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={this.addJobHandler}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Row>
                        <Col sm={4} md={4} className="job-dashboard-sidebar-col">
                            <div className="sidebar-backgroung">
                                <div className="job-sidebar-container">
                                    <div className="job-sidebar-job-list">
                                        <Col>
                                            <div className="jobs-details">
                                                <span><b>{this.state.totalDocs && this.state.totalDocs} jobs match your interests</b></span>
                                            </div>
                                        </Col>
                                        <ListGroup as="ul" className="job-list-group">
                                            {jobSidebar}
                                        </ListGroup>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8} md={8}>
                            {localStorage.getItem("Type") === "employer" &&
                                <div className="job-discription-card">
                                    <div className="job-create-job">
                                        <Row>
                                            <Col xs={11} md={11}>
                                                Create Job
                                            </Col>
                                            <Col xs={1} md={1}>
                                                <Icon type="plus" onClick={this.handleShow}></Icon>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            }
                            <div className="">
                                {this.state.discription_job &&
                                    <JobDiscription job={this.state.discription_job} />
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
export default compose(
    graphql(getJobsQuery, {
        name: "getJobsQuery",
        options: (props) => {
            if (localStorage.getItem("Type") === 'employer') {
                return ({ variables: { EmployerID: localStorage.getItem("id") } })
            }
            return ({ variables: { EmployerID: "" } })
        }
    }),

    graphql(addJob, { name: "addJob", 
        options:{
            refetchQueries: [{ query: getJobsQuery, variables: { EmployerID: localStorage.getItem("id")} }]
    }  })
)(JobDashboard);