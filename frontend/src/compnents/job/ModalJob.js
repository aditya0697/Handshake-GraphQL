import React, { Component } from 'react';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form } from 'react-bootstrap';
import { Icon } from 'antd';
import DatePicker from "react-datepicker";

class ModalJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.showModal,
            alertFlag: false,
            application_deadline: new Date(),
            post_date: new Date()
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    onChangeHandeler = (e) => this.setState({ [e.target.name]: e.target.value });

    postDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            post_date: date,
        })
    };

    deadlineDateChangeHandler = (date) => {
        console.log(date);
        this.setState({
            application_deadline: date,
        })
    };

    validation = () => {
        if (this.state.school && this.state.level && this.state.edu_major && this.state.gpa) {
            return true;
        }
        return false;
    }
    getUpdatedState = () => ({
        school: this.state.school,
        level: this.state.level,
        edu_major: this.state.edu_major,
        grad_date: this.state.grad_date.toISOString(),
        gpa: this.state.gpa,
    });

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
        this.props.addEducation(this.getUpdatedState(), this.props.user.email);

    }

    render() {
        return (
            <Styles>
                <div className="dashboard-background" id="employer_modal">
                    {/* --------------------------------------------------------------------------------------------------------------------------------- */}
                    <Modal  show={this.state.show} onHide={this.handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Title>Create Job</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="employer">
                                    <Form.Label className="signup-form-lable">Job Title</Form.Label>
                                    <Form.Control onChange={this.onValueChangeHandler} name="job_title" placeholder="Job Title" defaultValue={this.state.job_title} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="start_date">
                                        <Form.Label className="signup-form-lable">Post Date</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.post_date} name="start_date" className="date_picker" onChange={this.postDateChangeHandler} />
                                        <br />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="salary">
                                        <Form.Label className="signup-form-lable">Salary</Form.Label>
                                        <Form.Control onChange={this.onChangeHandeler} name="salary" type="number" placeholder="salary" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label className="signup-form-lable">Application Deadline,</Form.Label>
                                        <br />
                                        <DatePicker selected={this.state.application_deadline} name="end_date" className="date_picker" onChange={this.deadlineDateChangeHandler} />
                                        <br />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Job Category </Form.Label>
                                        <Form.Control as="select" name="job_category">
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
                                        <Form.Control name="city" placeholder="San Jose" onChange={this.onChangeHandeler} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control name="state" placeholder="CA" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control name="zip_code" placeholder="12345" onChange={this.onChangeHandeler} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control name="job_discription" as="textarea" placeholder="Discription..." />
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" onClick={this.saveChangeHandler}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
            </Styles>

        )
    }
}
//Export The Main Component
export default ModalJob;