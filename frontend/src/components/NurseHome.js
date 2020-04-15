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

//function to display the home of the nurse
function Nursehome(props) {
    // read the info from props, coming from the ancestor component
    const { screen, setScreen, type, setUsertype } = props;
    
    //
    const [status, setStatus] = useState(false);
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

    //
    const changeView = () => {

        setStatus(true)

    }

    //
    return (
        <div>
            {status == false ? <div>
                <Button variant="primary" type="submit" onClick={changeView}>
                    Show Patients List
                </Button><br /><br /><br /></div> : < PatientsList />}
            <a href="/motivation" ><Button variant="primary" >Send Motivation Tips</Button></a><br /><br /><br />

            <Button variant="primary" type="submit" onClick={deleteCookie}>
                Log Out
            </Button>
        </div>
    );
}

//
export default Nursehome;