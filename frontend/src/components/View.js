// import CreateArticle from './CreateArticle';
import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import List from './List';
import NurseHome from './NurseHome';
import "bootstrap/dist/css/bootstrap.min.css";

//function to switch between nurse and patient
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen, type, setUsertype } = props;
  
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

  //
  return (
    <div>
 
      {
        type == "nurse" &&
        <div>< NurseHome /></div>
      }
      {
        type == "patient" &&
        <div><List /></div>
      }
 <Button variant="primary" type="submit" onClick={deleteCookie}>
        Log Out
  </Button>
      
    </div>
  );
}

//
export default View;