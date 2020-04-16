// import CreateArticle from './CreateArticle';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//

//
function Motivation(props) {
  const [tip, setTip] = useState({
    _id: '', tip: '',
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/createTips";

  const saveTip = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      tip: tip.tip
    };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setTip({ ...tip, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Jumbotron>
        <Form onSubmit={saveTip}>
          <Form.Group>
            <Form.Label>Tip</Form.Label>
            <Form.Control type="text" name="tip" id="tip" placeholder="Enter a motivational tip" value={tip.tip} onChange={onChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

//
export default withRouter(Motivation);