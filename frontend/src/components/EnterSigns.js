import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link, withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import { sign } from 'jsonwebtoken';

function CreateSigns(props) {
    const user_ids = props.match.params.id;
    const [signs, setSigns] = useState({
        _id: '', bodyTemp: '', heartRate: '',
        bloodPressure: '', respiratoryRate: '',user_id:user_ids
    });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/signs" ;

    const saveSigns = (e) => {
        setShowLoading(true);
        e.preventDefault();
        console.log("reached save signs");
        const data = {
            bodyTemp: signs.bodyTemp, heartRate: signs.heartRate,
            bloodPressure: signs.bloodPressure, respiratoryRate: signs.respiratoryRate,
            user_id:signs.user_id
        };
        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                props.history.push('/showSigns/' + result.data._id)
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
                        <Form.Control type="number" name="bodyTemp" id="bodyTemp" placeholder="Enter the Body Tempearture" value={signs.bodyTemp} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Enter the Heart Rate</Form.Label>
                        <Form.Control type="number" name="heartRate" id="heartRate" placeholder="Enter the Heart Rate" value={signs.heartRate} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter the Blood Pressure</Form.Label>
                        <Form.Control type="number" name="bloodPressure" id="bloodPressure" rows="3" placeholder="Enter the Blood Pressure" value={signs.bloodPressure} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Enter the Respiratory Rate</Form.Label>
                        <Form.Control type="number" name="respiratoryRate" id="respiratoryRate" placeholder="Enter the Respiratory Rate" value={signs.respiratoryRate} onChange={onChange} />
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