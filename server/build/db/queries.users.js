"use strict";
var User = require('../db/models').User;
module.exports = {
    createUser: function (newUser, callback) {
        User.findOne({ where: { email: newUser.email } })
            .then(function (user) {
            if (user) {
                callback('email already in use');
            }
            else {
                return User.create({
                    email: newUser.email,
                    password: newUser.password
                })
                    .then(function (user) {
                    callback(null, user);
                })
                    .catch(function (err) {
                    var err = 'error creating user';
                    callback(err);
                });
            }
            ;
        });
    },
    getUser: function (email, callback) {
        User.findOne({ where: { email: email } })
            .then(function (user) {
            if (user) {
                callback(null, user);
            }
            else {
                var err = 'Match not found.';
                callback(err);
            }
        })
            .catch(function (err) {
            callback(err);
        });
    },
};
