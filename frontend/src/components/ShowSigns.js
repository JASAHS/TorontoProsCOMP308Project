import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowUser(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/signs/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log(result.data)
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
          <h3>Vital Signs</h3>
        <p>Body Temperature: {data.bodyTemp}</p>
        <p>Heart Rate: {data.heartRate}</p>
        <p>Blood Pressure: {data.bloodPressure}</p>
        <p>Respiratory Rate: {data.respiratoryRate}</p>
 
        {/* <p>
          <Button type="button" variant="primary" onClick={() => { editUser(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteUser(data._id) }}>Delete</Button>
        </p> */}
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowUser);
