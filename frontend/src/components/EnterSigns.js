import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link, withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";

function CreateSigns(props) {
    const [signs, setSigns] = useState({
        _id: '', bodyTemp: '', heartRate: '',
        bloodPressure: '', respiratoryRate: ''
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/";

    const saveSigns = (e) => {
        setShowLoading(true);
        e.preventDefault();
        console.log(signs.type);
        const data = {
            bodyTemp: signs.bodyTemp, heartRate: signs.heartRate,
            bloodPressure: signs.bloodPressure, respiratoryRate: signs.respiratoryRate
        };
        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/show/' + result.data._id)
            }).catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setSigns({ ...signs, [e.target.name]: e.target.value });
    }

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            <Jumbotron>
                <Form onSubmit={saveSigns}>
                    <Form.Group>
                        <Form.Label> Enter the Body Temperature</Form.Label>
                        <Form.Control type="text" name="bodyTemp" id="bodyTemp" placeholder="Enter the Body Tempearture" value={signs.bodyTemp} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Enter the Heart Rate</Form.Label>
                        <Form.Control type="text" name="heartRate" id="heartRate" placeholder="Enter the Heart Rate" value={signs.heartRate} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter the Blood Pressure</Form.Label>
                        <Form.Control type="text" name="bloodPressure" id="bloodPressure" rows="3" placeholder="Enter the Blood Pressure" value={signs.bloodPressure} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter the Respiratory Rate</Form.Label>
                        <Form.Control type="text" name="respiratory" id="respiratory" placeholder="Enter the Respiratory Rate" value={signs.respiratoryRate} onChange={onChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Jumbotron>
        </div>
    );
}

export default withRouter(CreateSigns);