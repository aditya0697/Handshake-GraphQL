import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './login/Login';
import Navbar from './landingPage/headers/Navbar';
import { BrowserRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from './landingPage/layout/Layout';
import JobDashboard from './job/JobDashboard';
import ProfileDashBoard from './profile/ProfileDashBoad';
import ApplicationDashBoard from'./application/ApplicationDashBoard';
import EventDashboard from './event/EventDashboard';
import StudentDashBoard from './students/StudentDashBoard';
import MessageDashBoard from './messages/MessageDashBoard';


const Styles = styled.div`
    .navbar-divider{
       height: 5px;
    }

    .main-container {
        margin: 24px;
    }

`;
//Create a Main Component
const Main = withRouter(({ location }) => {

    // const LoginContainer = () => (
    //     <div>
    //         <Route exact path="/" render={() => <Redirect to="/login" />} />
    //         <Route path="/login" component={Login} />
    //     </div>
    // )


    // const DefaultContainer = () => (
    //     <div>
    //         <Navbar />
    //         <Layout>
    //             <Route path="/jobs" component={JobDashboard} />
    //             <Route path="/profile" component={ProfileDashBoard} />
    //         </Layout>
    //     </div>
    // )

    return (
        <Styles>
            <BrowserRouter>
                <div>
                    {/* {location.pathname !== '/login' && <Navbar />} */}
                </div>
                {/* <Switch>
                    <div>
                        <Route exact path="/(login)" component={LoginContainer} />
                        <Route component={DefaultContainer} />

                    </div>
                </Switch> */}
                {/* <hr> </hr> */}
                <Route path="/login" component={Login} />
                <Route path="/" component={Navbar} />
                <Switch>
                    <Layout>
                        {/* <div className="navbar-divider"></div> */}
                        <Route path="/jobs" component={JobDashboard} />
                        <Route path="/profile" component={ProfileDashBoard} />
                        <Route path="/application" component={ApplicationDashBoard}/>
                        <Route path="/students" component={StudentDashBoard}/>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </Styles>
    )
}
)
//Export The Main Component
export default Main;