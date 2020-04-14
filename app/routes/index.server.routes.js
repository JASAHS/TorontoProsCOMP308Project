
var users = require('../../app/controllers/users.server.controller');
var signs=require('../../app/controllers/signs.server.controller');
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

    //vital signs entering
    console.log("reached route file of signs");
    app.post('/signs',signs.create);
    // app.get('/signs/:signId',signs.read);
    app.get('/signs/:signId',signs.read);
    // app.get('/signs/:signId',signs.signsByID);
    app.param('signId', signs.signsByID);

};
