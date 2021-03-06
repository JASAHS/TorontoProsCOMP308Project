import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

//function to filter the patient and nurse
function List(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/users";
    const pdata=[];
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const showDetail = (id) => {
        props.history.push({
            pathname: '/showPatient/' + id
        });
    }

    return (
        <div>
            {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            <ListGroup>
                {data.map((item, idx) => (
                <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.username}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default withRouter(List);
