"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var server = require('../../src/server');
var authHelpers = require('../../src/helpers/auth');
var sequelize = require('../../src/db/models/index').sequelize;
var List = require('../../src/db/models').List;
var ListItem = require('../../src/db/models').ListItem;
var User = require('../../src/db/models').User;
var base = 'http://localhost:4000/listItems/';
var addToken = function (token) {
    axios.defaults.headers.common = { 'Authorization': "Bearer " + token };
};
var removeToken = function () {
    delete axios.defaults.headers.common['Authorization'];
};
describe('routes: listItems', function () {
    beforeEach(function (done) {
        var _this = this;
        this.user;
        this.token;
        this.list;
        this.listItem;
        sequelize.sync({ force: true })
            .then(function () {
            var userData = {
                email: 'test@email.com',
                password: '123456'
            };
            _this.token = authHelpers.createToken(userData.email);
            User.create(userData)
                .then(function (user) {
                _this.user = user;
                List.create({
                    title: 'test list',
                    userId: _this.user.id
                })
                    .then(function (list) {
                    _this.list = list;
                    ListItem.create({
                        text: 'list item test text',
                        listId: _this.list.id
                    })
                        .then(function (listItem) {
                        _this.listItem = listItem;
                        done();
                    })
                        .catch(function (err) {
                        console.log(err);
                        done();
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                    done();
                });
            })
                .catch(function (err) {
                console.log(err);
                done();
            });
        })
            .catch(function (err) {
            console.log(err);
            done();
        });
        // END BEFORE EACH
    });
    describe('POST /listItems/create', function () {
        it('should create a listItem associated with the list', function (done) {
            var data = {
                text: 'second list item',
                listId: this.list.id
            };
            // add token to req
            addToken(this.token);
            axios.post(base + "create", data)
                .then(function (res) {
                removeToken();
                expect(res.data.isComplete).toBeFalsy();
                expect(res.data.text).toBe('second list item');
                expect(res.data.id).toBe(2);
                expect(res.data.listId).toBe(1);
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        // END CREATE LIST ITEM SPEC
    });
    describe('POST /listItems/delete', function () {
        it('should delete the listItem with the specified id', function (done) {
            var _this = this;
            var data = {
                listItemId: this.listItem.id,
                listId: this.listItem.listId
            };
            addToken(this.token);
            axios.post(base + "delete", data)
                .then(function (res) {
                removeToken();
                expect(res.status).toBe(200);
                ListItem.findByPk(_this.listItem.id)
                    .then(function (list) {
                    expect(list).toBeNull();
                    done();
                })
                    .catch(function (err) {
                    expect(err).toBeNull();
                    done();
                });
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not delete the listItem when not authenticated', function (done) {
            var _this = this;
            var data = {
                listItemId: this.listItem.id,
                listId: this.listItem.listId
            };
            axios.post(base + "delete", data)
                .then(function () {
                ListItem.findByPk(_this.listItem.id)
                    .then(function (listItem) {
                    // list item should not be deleted
                    expect(listItem.text).toBe('list item test text');
                    done();
                })
                    .catch(function (err) {
                    expect(err.request.res.statusMessage).toBe('error while authenticating');
                    done();
                });
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error while authenticating');
                done();
            });
        });
        // END DELETE LIST ITEM SPEC
    });
    describe('POST /listItems/update', function () {
        it('should update the text of the specified listItem', function (done) {
            var data = {
                updatedText: 'updated text',
                listItemId: this.listItem.id,
                listId: this.listItem.listId
            };
            addToken(this.token);
            axios.post(base + "update", data)
                .then(function (res) {
                removeToken();
                expect(res.data.text).toBe('updated text');
                expect(res.status).toBe(200);
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not update the specified listItem if not authenticated', function (done) {
            var data = {
                updatedText: 'updated text',
                listItemId: this.listItem.id,
                listId: this.listItem.listId
            };
            axios.post(base + "update", data)
                .then(function (res) {
                // expect errors
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error while authenticating');
                done();
            });
        });
        // END UPDATE LIST ITEMS TEST
    });
    describe('POST /listItems/completed', function () {
        it('should change isComplete for the selected list item', function (done) {
            var _this = this;
            var data = {
                completed: true,
                listItemId: this.listItem.id,
                listId: this.listItem.listId
            };
            addToken(this.token);
            axios.post(base + "completed", data)
                .then(function (res) {
                removeToken();
                expect(res.status).toBe(200);
                ListItem.findByPk(_this.listItem.id)
                    .then(function (listItem) {
                    expect(listItem.isComplete).toBeTruthy();
                    done();
                })
                    .catch(function (err) {
                    expect(err).toBeNull();
                    done();
                });
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not change isComplete if not authenticated', function (done) {
            var data = {
                completed: true,
                listItemId: this.listItem.id,
                listId: this.listItem.listId
            };
            axios.post(base + "completed", data)
                .then(function (res) {
                // expect errors
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error while authenticating');
                done();
            });
        });
        // END COMPLETED LIST ITEMS TEST
    });
    describe('POST /listItems/activeList', function () {
        it('should return an array of list items for the selected list', function (done) {
            var _this = this;
            var data = {
                listId: this.list.id
            };
            // add another item to the list
            ListItem.create({
                text: 'second test list item',
                listId: this.list.id
            })
                .then(function () {
                addToken(_this.token);
                axios.post(base + "activeList", data)
                    .then(function (res) {
                    removeToken();
                    expect(res.data[0].text).toBe('list item test text');
                    expect(res.data[1].text).toBe('second test list item');
                    done();
                })
                    .catch(function (err) {
                    expect(err).toBeNull();
                    done();
                });
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not return items if not authenticated', function (done) {
            var data = {
                listId: this.list.id
            };
            axios.post(base + "activeList", data)
                .then(function (res) {
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error while authenticating');
                done();
            });
        });
        // END GET ACTIVE LIST TEST
    });
    // END LIST ITEMS INTEGRATION SPEC
});
