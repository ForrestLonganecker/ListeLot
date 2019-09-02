"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize = require('../../src/db/models/index').sequelize;
var User = require('../../src/db/models').User;
describe('User', function () {
    beforeEach(function (done) {
        var _this = this;
        this.user;
        sequelize.sync({ force: true })
            .then(function () {
            User.create({
                email: 'test@email.com',
                password: '123456'
            })
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
        // END BEFORE EACH
    });
    describe('#create()', function () {
        it('should create a User object with valid email and password', function (done) {
            User.create({
                email: 'some@email.com',
                password: '123456'
            })
                .then(function (user) {
                expect(user.email).toBe('some@email.com');
                expect(user.id).toBe(2);
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        // END CREATE USER TEST
    });
    describe('#destroy()', function () {
        it('should destroy user data for user with given id', function (done) {
            var _this = this;
            User.destroy({ where: { id: this.user.id } })
                .then(function () {
                User.findByPk(_this.user.id)
                    .then(function (user) {
                    expect(user).toBeNull();
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
        // END DESTROY USER TEST
    });
    // END OF USER UNIT SPEC
});
