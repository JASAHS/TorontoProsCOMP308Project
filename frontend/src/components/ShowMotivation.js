import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withRouter } from 'react-router-dom';

function ShowMotivation(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/showTips";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log(result.data);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showMotivation/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>    
        <h3>Tips</h3>
        <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx}>{item.tip}</ListGroup.Item>
        ))}
      </ListGroup>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowMotivation);