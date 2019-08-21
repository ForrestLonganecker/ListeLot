"use strict";
var authHelpers = require('../helpers/auth');
var listQueries = require('../db/queries.lists');
var userQueries = require('../db/queries.users');
var listItemQueries = require('../db/queries.listItems');
module.exports = {
    create: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            // check fo a user with associated email
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error while authenticating';
                    res.end();
                }
                else {
                    // check for list with associated userid && listid
                    listQueries.getList(user.id, req.body.listId, function (err, list) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'Could not find a matching list';
                            res.end();
                        }
                        else {
                            var newListItem = {
                                text: req.body.text,
                                listId: list.id
                            };
                            listItemQueries.createListItem(newListItem, function (err, listItem) {
                                if (err) {
                                    res.status(400);
                                    res.statusMessage = 'Error creating list item';
                                    res.end();
                                }
                                else {
                                    res.send(listItem);
                                }
                                ;
                            });
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating';
            res.end();
        }
        ;
    },
    delete: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            // check for a user with associated email
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error while authenticating';
                    res.end();
                }
                else {
                    listQueries.getList(user.id, req.body.listId, function (err, list) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'Error locating list';
                            res.end();
                        }
                        else {
                            listItemQueries.destroy(req.body.listItemId, function (err, deletedListItem) {
                                if (err) {
                                    res.status(400);
                                    res.statusMessage = 'Error deleting list item';
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
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating';
            res.end();
        }
        ;
    },
    update: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            // check for a user with associated email
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error while authenticating';
                    res.end();
                }
                else {
                    // locate the list associated with the user
                    listQueries.getList(user.id, req.body.listId, function (err, list) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'Error locating list';
                            res.end();
                        }
                        else {
                            var updateInfo = {
                                listItemId: req.body.listItemId,
                                listId: list.id,
                                text: req.body.updatedText
                            };
                            listItemQueries.updateText(updateInfo, function (err, updatedListItem) {
                                if (err) {
                                    res.status(400);
                                    res.statusMessage = 'Error updating list item';
                                    ;
                                    res.end();
                                }
                                else {
                                    res.send(updatedListItem);
                                }
                                ;
                            });
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating';
            res.end();
        }
        ;
    },
    completed: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            // check for a user with associated email
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error while authenticating';
                    res.end();
                }
                else {
                    // locate the list associated with the user
                    listQueries.getList(user.id, req.body.listId, function (err, list) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'Error locating list';
                            res.end();
                        }
                        else {
                            var updateInfo = {
                                listItemId: req.body.listItemId,
                                listId: list.id,
                                completed: req.body.completed
                            };
                            listItemQueries.completed(updateInfo, function (err, updatedItem) {
                                if (err) {
                                    res.status(400);
                                    res.statusMessage = 'Error updating list item';
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
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating';
            res.end();
        }
    },
    activeList: function (req, res) {
        var token = authHelpers.hasToken(req);
        if (token) {
            // check for a user with associated email
            userQueries.getUser(token.email, function (err, user) {
                if (err) {
                    res.status(400);
                    res.statusMessage = 'error while authenticating';
                    res.end();
                }
                else {
                    // locate the list associated with the user
                    listQueries.getList(user.id, req.body.listId, function (err, list) {
                        if (err) {
                            res.status(400);
                            res.statusMessage = 'Error locating list';
                            res.end();
                        }
                        else {
                            listItemQueries.getAll(list.id, function (err, listItems) {
                                if (err) {
                                    res.status(400);
                                    res.statusMessage = 'Error retrieving items';
                                    res.end();
                                }
                                else {
                                    res.send(listItems);
                                }
                                ;
                            });
                        }
                        ;
                    });
                }
                ;
            });
        }
        else {
            res.status(400);
            res.statusMessage = 'error while authenticating';
            res.end();
        }
        ;
    },
};
