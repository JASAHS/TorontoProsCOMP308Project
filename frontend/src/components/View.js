// import CreateArticle from './CreateArticle';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import List from './List';
import { Link, withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
//

//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
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
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const getData = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const changeView = () => {

    setStatus(true)

  }
  //
  return (
    <div>
      {status == false
        ? <div>
          <Button variant="primary" type="submit" onClick={changeView}>
            Show Patients List
  </Button></div> : <List />}


    </div>
    // <div className="App">
    //   {article !== 'y'
    //     ? <div>
    //         <p>{screen}</p>
    //         <p>{data}</p>
    //         <button onClick={getData}>Get Data</button>
    //         <button onClick={createArticle}>Create Article</button>
    //         <button onClick={deleteCookie}>Log out</button>
    //       </div>            
    //     : <CreateArticle screen={screen} setScreen={setScreen} />
    //   }
    // </divdiv>
  );
}

//
export default View;