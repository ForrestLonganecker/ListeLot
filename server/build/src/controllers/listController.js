"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authHelpers = require('../helpers/auth');
var listQueries = require('../db/queries.lists');
var userQueries = require('../db/queries.users');
;
;
;
;
;
module.exports = {
    create: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'Credentials do not match';
                    res.end();
                }
                else {
                    var newList = {
                        title: req.body.title,
                        userId: user.id
                    };
                    listQueries.createList(newList, function (err, list) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'error while creating list.';
                            res.end();
                        }
                        else {
                            // return object is list without list.userId
                            var data = list;
                            res.send(data);
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating.';
            res.end();
        }
        ;
    },
    delete: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'credentials do not match.';
                    res.end();
                }
                else {
                    var deleteInfo = {
                        listId: req.body.listId,
                        userId: user.id
                    };
                    listQueries.destroy(deleteInfo, function (err, deletedList) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'error creating list.';
                            res.end();
                        }
                        else {
                            res.sendStatus(200);
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating.';
            res.end();
        }
        ;
    },
    update: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error when authenticating';
                    res.end();
                }
                else {
                    var updateInfo = {
                        updatedTitle: req.body.updatedTitle,
                        listId: req.body.listId,
                        userId: user.id
                    };
                    listQueries.update(updateInfo, function (err, updatedList) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'error updating list';
                            res.end();
                        }
                        else {
                            res.send(updatedList);
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error when authenticating';
            res.end();
        }
        ;
    },
    getAll: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error when authenticating';
                    res.end();
                }
                else {
                    listQueries.getAll(user.id, function (err, lists) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'error fetching lists';
                            res.end();
                        }
                        else {
                            res.send(lists);
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error when authenticating';
            res.end();
        }
        ;
    },
};
