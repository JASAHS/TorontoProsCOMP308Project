import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

//List to display the users
function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/users";

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
      pathname: '/show/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }
      <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.username}</ListGroup.Item>
        ))}
      </ListGroup>
      <a href="/showmotivation" ><Button variant="primary" >Show Motivational Tips</Button></a><br /><br /><br />
    </div>
  );
}

export default withRouter(List);
