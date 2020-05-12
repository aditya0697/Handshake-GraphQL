import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Container, ListGroup, InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { getPhoneNumber, getEmail, getAddress } from './../../redux/selectors';
import { updateEmployerProfile, } from './../../redux/actions/employerActions';
import {updateStudentProfile} from './../../redux/actions/studentActions';


const Styles = styled.div`
   .profile-Contact-card {
        max-height: 400px;
        overflow-y: scroll;
        width: 210;
        padding: 24px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
   }
   .profile-contact-contact{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 18px;
    font-weight: 550;
    height: 30px;
   }
   .profile-contact-type{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 14px;
    font-weight: 550;
    height: 20px;
   }
   .profile-contact-value{
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: 12px;
    font-weight: 150;
    height: 20px;
   }
`;

class ProfileContactInfoCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose = (e) => {
        this.setState({
            show: false,
        })
    };
    handleShow = (e) => {
        console.log("Inside handleShow");
        this.setState({
            show: true,
        })
    };
    validation = () => {
        if (this.state.phone_number && this.state.last_name) {
            return true;
        }
        return false;
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

    isAddressUpdated = () => {
        if(this.props.user.user_type === "student"){
            return false;
        }
        if (this.state.Street || this.state.Apt || this.state.City || this.state.State || this.state.Zipcode){
            return true;
        }
        return false;
    }
    updatedAddress = () => {
        const address = {
            "_id": this.props.address._id,
            "Street": this.props.address.Street,
            "Apt": this.props.address.Apt,
            "City":  this.props.address.City,
            "State":  this.props.address.State,
            "Zipcode":  this.props.address.Zipcode,
        }
        if (this.state.Street){
            address.Street = this.state.Street;
        }
        if (this.state.Apt){
            address.Apt = this.state.Apt;
        }
        if (this.state.City){
            address.City = this.state.City;
        }
        if (this.state.State){
            address.State = this.state.State;
        }
        if (this.state.Zipcode){
            address.Zipcode = this.state.Zipcode;
        }
        return address;
    }

    saveChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
        })
        if (this.state.phone_number) {
            if(this.props.user.user_type === "employer"){
                const data = {
                    PhoneNumber: this.state.phone_number
                }
                this.props.updateEmployerProfile(this.props.employerData,data);
            }
            else {
                const data = {
                    PhoneNumber: this.state.phone_number
                }
                this.props.updateStudentProfile(this.props.studentData, data);
            }
        }
        if(this.props.user.user_type === "employer"){
            if (this.isAddressUpdated) {
                const data = {
                    Address: this.updatedAddress()
                }
                console.log("===-------------------------------=====",JSON.stringify(data));
                this.props.updateEmployerProfile(this.props.employerData, data);
            }
        } 
    }

    render() {

        return (
            <Styles>
                <div className="profile-Contact-card">
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Contact Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="">
                                        <Form.Label className="signup-form-lable">Phone Number</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="phone_number" defaultValue={this.props.phone_number} />
                                    </Form.Group>
                                </Form.Row>
                                {this.props.user.user_type === "employer" &&
                                    <div>
                                        <Form.Group controlId="formGridAddress1">
                                            <Form.Label>Address</Form.Label>
                                            {
                                                this.props.address && <Form.Control placeholder="1234 Main St" onChange={this.onValueChangeHandler} name="Street" defaultValue={this.props.address.Street} />

                                            }
                                        </Form.Group>

                                        <Form.Group controlId="formGridAddress2">
                                            <Form.Label>Address 2</Form.Label>
                                            {
                                                this.props.address && <Form.Control placeholder="Apartment, studio, or floor" onChange={this.onValueChangeHandler} name="Apt" defaultValue={this.props.address.Apt} />

                                            }
                                            
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridCity">
                                                <Form.Label>City</Form.Label>
                                                {
                                                    this.props.address &&  <Form.Control name="City" placeholder="San Jose" onChange={this.onValueChangeHandler} defaultValue={this.props.address.City} />

                                                }
                                               
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Label>State</Form.Label>
                                                {
                                                    this.props.address && <Form.Control placeholder="California" name="State" onChange={this.onValueChangeHandler} defaultValue={this.props.address.State} />

                                                }
                                               
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Zip</Form.Label>
                                                {
                                                    this.props.address && <Form.Control placeholder="95192" name="Zipcode" onChange={this.onValueChangeHandler} defaultValue={this.props.address.Zipcode} />

                                                }
                                                
                                            </Form.Group>
                                        </Form.Row>
                                    </div>
                                }
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
                    <div className="profile-contact-contact">
                        <Row>
                            <Col xs={10} md={10}>
                                Contact Information
                            </Col>
                            <Col xs={1} md={1}>
                                <Icon type="edit" onClick={this.handleShow}></Icon>
                            </Col>
                        </Row>
                    </div>
                    <div className="profile-contact-type">
                        Email Address
                    </div>
                    <div className="profile-contact-value">
                        {this.props.email}
                    </div>
                    <div className="profile-contact-type">
                        Phone Number
                    </div>
                    <div className="profile-contact-value">
                        {this.props.phone_number}
                    </div>
                    {this.props.user.user_type === "employer" &&
                        <div>
                            <div className="profile-contact-type">
                                Address
                        </div>
                            {this.props.address &&
                                <div>
                                    <div className="profile-contact-value">
                                        {this.props.address.Street}
                                    </div>
                                    <div className="profile-contact-value">
                                        {this.props.address.Apt}
                                    </div>
                                    <div className="profile-contact-value">
                                        {this.props.address.City}, {this.props.address.State}, {this.props.address.Zipcode}
                                    </div>
                                </div>
                            }

                        </div>
                    }
                </div>
            </Styles>

        );
    };
}
const mapStateToProps = state => {
    return {
        user: state.auth,
        email: getEmail(state),
        phone_number: getPhoneNumber(state),
        address: getAddress(state.employer.employerData),
        studentData: state.student.studentData,
        employerData: state.employer.employerData,
    };
};

export default connect(mapStateToProps, {updateEmployerProfile, updateStudentProfile })(ProfileContactInfoCard);