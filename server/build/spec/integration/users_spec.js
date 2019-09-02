"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var server = require('../../src/server');
var authHelpers = require('../../src/helpers/auth');
var sequelize = require('../../src/db/models/index').sequelize;
var User = require('../../src/db/models').User;
var base = 'http://localhost:4000/users/';
describe('routes: users', function () {
    beforeEach(function (done) {
        var _this = this;
        this.user;
        this.token;
        sequelize.sync({ force: true })
            .then(function () {
            var data = {
                email: 'test@email.com',
                password: '123456'
            };
            // create a token from test data
            _this.token = authHelpers.createToken(data.email);
            axios.post(base + "create", data)
                .then(function () {
                User.findOne({ where: { email: 'test@email.com' } })
                    .then(function (user) {
                    _this.user = user;
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
    describe('POST /users/create', function () {
        it('should create a user with the specified email and password', function (done) {
            var data = {
                email: 'some@email.com',
                password: '123456'
            };
            axios.post(base + "create", data)
                .then(function (res) {
                // check response cookie
                var decodedEmail = authHelpers.decode(res.data).email;
                expect(decodedEmail).toBe('some@email.com');
                User.findOne({ where: { email: 'some@email.com' } })
                    .then(function (user) {
                    expect(user.email).toBe('some@email.com');
                    expect(user.id).toBe(2);
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
        it('should not create a user with a duplicate email', function (done) {
            var data = {
                email: 'test@email.com',
                password: '123456'
            };
            axios.post(base + "create", data)
                .then(function (res) {
                expect(res.data).toBe('email already in use');
                expect(res.statusCode).toBe(400);
                done();
            })
                .catch(function (err) {
                expect(err.isAxiosError).toBeTruthy();
                done();
            });
        });
        // END USER CREATE TEST
    });
    describe('POST /users/login', function () {
        it('should return a jwt token upon successful authentication', function (done) {
            var data = {
                email: 'test@email.com',
                password: '123456'
            };
            axios.post(base + "login", data)
                .then(function (res) {
                var token = authHelpers.decode(res.data);
                expect(token.email).toBe('test@email.com');
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        // END USER LOGIN TEST
    });
    describe('GET /users/authenticate', function () {
        it('should authenticate requests that contain the token in the authbearer header', function (done) {
            // set axios default header to contain the token
            axios.defaults.headers.common = { 'Authorization': "Bearer " + this.token };
            axios.get(base + "authenticate")
                .then(function (res) {
                var token = authHelpers.decode(res.data);
                expect(token.email).toBe('test@email.com');
                // remove the default headers from the req
                delete axios.defaults.headers.common['Authorization'];
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not authenticate requests that are missing a token', function (done) {
            // no axios headers provided
            axios.get(base + "authenticate")
                .then(function (res) {
                // expect nothing to happen here
                expect(res).toBeNull();
                done();
            })
                .catch(function (err) {
                // how to access res.values from the {err}
                expect(err.request.res.statusCode).toBe(400);
                expect(err.isAxiosError).toBeTruthy();
                done();
            });
        });
        // END USER AUTHENTICATED TEST
    });
    // END USER INTEGRATION SPEC
});
