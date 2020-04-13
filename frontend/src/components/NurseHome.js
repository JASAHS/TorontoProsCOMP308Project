// import CreateArticle from './CreateArticle';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import List from './List';
import PatientsList from './PatientsList';
import { withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Home from './Home';
import Motivation from './Motivation';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from './CreateUser';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
//

//
function View(props) {
    // read the info from props, coming from the ancestor component
    // var screen1 = props.screen;
    // var setScreen1 = props.setScreen;
    const { screen, setScreen, type, setUsertype } = props;
    // const { type, setUsertype } = props;
    // const type1 = props.type;
    // const setType1 = props.setUsertype;

    console.log(type + "bro2");
    // return a stateful value and funcion to update it
    const [data, setData] = useState();
    //
    const [status, setStatus] = useState(false);
    const [status2, setStatus2] = useState(false);
    // called when user clicks on Logout button
    // to clear the cookie and set the screen state variable 
    // back to its initial state.
    const deleteCookie = async () => {
        try {
            await axios.get('/signout');
            setScreen('auth');
        } catch (e) {
            console.log(e);
        }
    };
    // called when user clicks on Get Data button
    // end-point demonstrates another example for the use
    // of cookie specific response from the server.
    const getData = async () => {
        try {
            const res = await axios.get('/welcome');
            console.log(res.data)
            setData(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    //
    const changeView = () => {

        setStatus(true)

    }
    const changeView2 = () => {

        setStatus2(true)

    }
    //
    return (
        <div>
            {status == false ? <div>
                <Button variant="primary" type="submit" onClick={changeView}>
                    Show Patients List
                </Button><br /><br /><br /></div> : < PatientsList />}
            {/* {status2 == false ? <div>
                <Button variant="primary" type="submit" onClick={changeView2}>
                    Send Motivation Tips
                </Button><br /><br /><br /></div> : < CreateUser />} */}
            <a href="/motivation" ><Button variant="primary" >Send Motivation Tips</Button></a><br /><br /><br />

            <Button variant="primary" type="submit" onClick={deleteCookie}>
                Log Out
            </Button>
        </div>
    );
}

//
export default View;