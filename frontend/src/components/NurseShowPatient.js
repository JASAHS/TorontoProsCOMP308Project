import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowUser(props) {
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/users/" + props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const enterSigns = (id) => {
        props.history.push({
            pathname: '/enterSigns/' + id
        });
    };

    return (
        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <Jumbotron>
                <h1>Name: {data.firstName}, {data.lastName}</h1>
                <p>Email: {data.email}</p>
                <p>
                    <Button type="button" variant="primary" onClick={() => { enterSigns(data._id) }}>Enter Vital Signs</Button>&nbsp;

                </p>
            </Jumbotron>
        </div>
    );
}

export default withRouter(ShowUser);
