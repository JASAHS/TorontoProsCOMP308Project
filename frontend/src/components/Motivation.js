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



    //
    return (
        <div><h3>what up bro what up</h3>
            {/* <Jumbotron>
                <Form onSubmit={saveUser}>

                    <Form.Group>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" name="username" id="username" placeholder="Enter user name" value={user.username} onChange={onChange} />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Jumbotron> */}
        </div>
    );
}

//
export default View;