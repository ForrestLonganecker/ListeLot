"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var server = require('../../src/server');
var authHelpers = require('../../src/helpers/auth');
var sequelize = require('../../src/db/models/index').sequelize;
var List = require('../../src/db/models').List;
var User = require('../../src/db/models').User;
var base = 'http://localhost:4000/lists/';
describe('routes: lists', function () {
    beforeEach(function (done) {
        var _this = this;
        this.user;
        this.token;
        this.list;
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
        // END BEFORE EACH
    });
    describe('POST /lists/create', function () {
        it('should create a list with the associated user', function (done) {
            var data = {
                title: 'second list'
            };
            // set the auth token in the header of the req
            axios.defaults.headers.common = { 'Authorization': "Bearer " + this.token };
            axios.post(base + "create", data)
                .then(function (res) {
                expect(res.data.title).toBe('second list');
                // remove the default headers token
                delete axios.defaults.headers.common['Authorization'];
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not create a list without auth token', function (done) {
            var data = {
                title: 'second list'
            };
            axios.post(base + "create", data)
                .then(function (res) {
                // expect errors
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                expect(err.isAxiosError).toBeTruthy();
                expect(err.request.res.statusMessage).toBe('error while authenticating.');
                expect(err.request.res.statusCode).toBe(400);
                done();
            });
        });
        // END LIST CREATE TEST
    });
    describe('POST /lists/delete', function () {
        it('should delete the list if the requested user has access to it', function (done) {
            var _this = this;
            var data = {
                listId: this.list.id
            };
            // add auth token
            axios.defaults.headers.common = { 'Authorization': "Bearer " + this.token };
            axios.post(base + "delete", data)
                .then(function (res) {
                // remove auth token
                delete axios.defaults.headers.common['Authorization'];
                // successfull status code passed
                expect(res.status).toBe(200);
                List.findByPk(_this.list.id)
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
        it('should not delete a list if no auth is provided', function (done) {
            var _this = this;
            var data = {
                listId: this.list.id
            };
            axios.post(base + "delete", data)
                .then(function () {
                List.findByPk(_this.list.id)
                    .then(function (list) {
                    // list should not be deleted
                    expect(list.title).toBe('Test list');
                    done();
                })
                    .catch(function (err) {
                    expect(err.request.res.statusMessage).toBe('error while authenticating.');
                    done();
                });
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error while authenticating.');
                done();
            });
        });
        // END DELETE LIST TEST
    });
    describe('POST /lists/update', function () {
        it('should update the specified list if the user owns it', function (done) {
            var updateInfo = {
                updatedTitle: 'updated title',
                listId: this.list.id
            };
            axios.defaults.headers.common = { 'Authorization': "Bearer " + this.token };
            axios.post(base + "update", updateInfo)
                .then(function (res) {
                delete axios.defaults.headers.common['Authorization'];
                expect(res.data.title).toBe('updated title');
                expect(res.status).toBe(200);
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not update the specified list if not authorized', function (done) {
            var updateInfo = {
                updatedTitle: 'updated title',
                listId: this.list.id
            };
            axios.post(base + "update", updateInfo)
                .then(function (res) {
                // expect errors
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error when authenticating');
                done();
            });
        });
        // END UPDATE LIST TEST
    });
    describe('GET /lists', function () {
        it('should get all the lists for the authenticated user', function (done) {
            axios.defaults.headers.common = { 'Authorization': "Bearer " + this.token };
            axios.get(base + "getAll")
                .then(function (res) {
                delete axios.defaults.headers.common['Authorization'];
                expect(res.data[0].title).toBe('test list');
                expect(res.data[0].userId).toBeUndefined();
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not get any lists for a non-authenticated user', function (done) {
            axios.get(base + "getAll")
                .then(function (res) {
                // expect errors
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                expect(err.request.res.statusMessage).toBe('error when authenticating');
                expect(err.isAxiosError).toBeTruthy();
                done();
            });
        });
        // END GET LISTS TEST
    });
    // END LIST INTEGRATION SPEC
});
