"use strict";
// import helper functions
var authHelpers = require('../helpers/auth');
// import database manipulation functions
var userQueries = require('../db/queries.users');
module.exports = {
    create: function (req, res) {
        var newUser = {
            email: req.body.email,
            password: authHelpers.encryptPassword(req.body.password)
        };
        userQueries.createUser(newUser, function (err, user) {
            if (err) {
                res.status(400);
                res.statusMessage = err.message;
                res.end();
            }
            else {
                if (authHelpers.comparePasswords(req.body.password, user.password)) {
                    // If password matches create a jwt and send it to front end
                    var data = authHelpers.createToken(user.email);
                    res.send(data);
                }
                else {
                    res.status(400);
                    res.statusMessage = 'Log in credentials do not match.';
                    res.end();
                }
                ;
            }
            ;
        });
    },
    logIn: function (req, res) {
        userQueries.getUser(req.body.email, function (err, user) {
            if (err) {
                res.status(400);
                res.statusMessage = 'Log in credentials do not match.';
                res.end();
            }
            else {
                if (authHelpers.comparePasswords(req.body.password, user.password)) {
                    var data = authHelpers.createToken(user.email);
                    res.send(data);
                }
                else {
                    // status comes through as res.status
                    res.status(400);
                    // statusMessage comes through as res.statusText
                    res.statusMessage = 'Log in credentials do not match.';
                    res.end();
                }
                ;
            }
            ;
        });
    },
    authenticate: function (req, res) {
        // if there is a token that matches in the req return it, else false
        var token = authHelpers.hasToken(req);
        if (token) {
            // check for user in db
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'Not authenticated';
                    res.end();
                }
                else {
                    // if user exists in db create a new token and send it to the front
                    var newToken = authHelpers.createToken(user.email);
                    res.send(newToken);
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'Not authenticated';
            res.end();
        }
        ;
    },
};
