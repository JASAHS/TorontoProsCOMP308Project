﻿
var users = require('../../app/controllers/users.server.controller');
var express = require('express');
var router = express.Router();
//Load the 'index' controller
//
//handle routing for get and post request
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', function (req, res) {

        res.render('index');
    });


    app.get("/users", users.list);
    app.post('/', users.create);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete)

    app.param('userId', users.userByID);
    //authenticate user
    app.post('/signin', users.authenticate);
    app.get('/signout', users.signout);
    app.get('/read_cookie', users.isSignedIn);


    //path to a protected page
    app.get('/welcome', users.welcome);

};
