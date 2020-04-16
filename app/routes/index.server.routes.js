
var users = require('../../app/controllers/users.server.controller');
var signs = require('../../app/controllers/signs.server.controller');
var tips = require('../../app/controllers/tips.server.controller');
var express = require('express');
var router = express.Router();

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
    app.get('/showTips', tips.list);
    app.post('/createTips', tips.create);

    //vital signs entering
    app.post('/signs',signs.create); //entering vital signs
    app.get('/signs/:signId',signs.read);//retrive vital signs
    app.get('/signses/:userIds',signs.findWithUser);//retrive the vital signs of the user
    app.delete('/signsess:id',signs.destroy);//delete the vital signs of the user
    app.param('signId', signs.signsByID);

};
