import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Avatar from 'react-avatar';
import { Navbar as Nbar, Nav, Button, NavDropdown, Form, FormControl, Image, Col, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import cookies from 'react-cookies';
import {connect} from 'react-redux';
import {getIsLoggedInState, getName, getProfileUrl} from '../../../redux/selectors';
import {login,logout} from './../../../redux/actions';
import {signout} from './../../../redux/actions/authActions';
import {studentDetails} from './../../../redux/actions/studentActions';
import {employerDetails} from './../../../redux/actions/employerActions';




const Styles = styled.div`
.navbar {
    background-color: #222;
    padding-right: 15px;
    padding-left: 15px;
    padding-right: 82.5px;
    padding-left: 82.5px;
    height: 80px;
  }
  a, .navbar-nav .nav-link {
    color: black;
    padding-right: 15px;
    padding-left: 15px;
    &:hover {
      border-bottom: 2px solid #4d4d4d;
    }
  }

  .avatar {
    padding-right: 25px;
    padding-left: 25px;
  }
`;

class Navbar extends Component {
    // var hideNavbar = useSelector(state => state.isLogged);
    constructor (props){
        super(props);
        // this.state = {
        //     showNavbar: this.props.showNavbar,
        // }
    }

    logoutHandler = (e) => {
        e.preventDefault();
        this.props.signout();
        // cookies.remove('cookie');
        this.props.history.push("/login");
    }
    
    handleAvatarClick = (e) => {
        e.preventDefault();
        this.props.history.push("/profile");
    }


    componentWillReceiveProps(nextProps) {
        console.log("Props received in navbar")
        console.log(nextProps)
        if(nextProps.user){
            console.log("user:",nextProps.user);
            // if(!nextProps.user.email){
            //     this.props.history.push("/login");
            // }
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem("Email")){
            console.log("NO Navbar ");
            redirectVar = <Redirect to="/login" />;
            return  redirectVar;
        }
        var name = ""
       
        if(localStorage.getItem("Email")) {
            console.log("Student Name: "+this.props.name);
            if (localStorage.getItem("Type") == 'student'){
                name = localStorage.getItem("StudentName");
            }
            if(localStorage.getItem("Type") == 'employer'){
                console.log("Fetch Employer data: ");
                name = localStorage.getItem("EmployerName");
            }
        }
        
        return (
            <Styles>
                <div>
                {redirectVar}
                    <Nbar bg="light" variant="light" expand={true}>
                        <Nbar.Brand href="#home">
                            <img
                                alt=""
                                src="/logo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                        </Nbar.Brand>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>
                        <Nav className="mr-auto">
                        </Nav>
                        <Nbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nbar.Collapse id="basic-navbar-nav" className="mr-sm-2"></Nbar.Collapse>
                        <Nav className="justify-content-end">
                            <Nav.Link href="/Jobs">Jobs</Nav.Link>
                            <Nav.Link href="/application">Application</Nav.Link>
                            <Nav.Link href="/students">Students</Nav.Link>
                        </Nav>
                        {/* </Nbar.Collapse> */}
                        <div className="avatar">
                            <Avatar onClick={this.handleAvatarClick} name={name} size="50px" src={this.props.profile_picture} size={50} round={true} />
                        </div>
                        <div className="avatar">
                            <Button onClick={this.logoutHandler} >Logout</Button> 
                        </div>
                    </Nbar>
                </div>
            </Styles>
        )
    }
}



const mapStateToProps = state => { 
    return { 
        showNavbar: getIsLoggedInState(state),
        name: getName(state),
        user: state.auth,
        profile_picture: getProfileUrl(state),
    };
  };


//Export The Main Component
export default connect(mapStateToProps, {signout, studentDetails, employerDetails})(Navbar);