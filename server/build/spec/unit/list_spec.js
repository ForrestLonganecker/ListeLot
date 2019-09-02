"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize = require('../../src/db/models/index').sequelize;
var User = require('../../src/db/models').User;
var List = require('../../src/db/models').List;
describe('List', function () {
    beforeEach(function (done) {
        var _this = this;
        this.user;
        this.list;
        sequelize.sync({ force: true })
            .then(function () {
            User.create({
                email: 'test@email.com',
                password: '123456'
            })
                .then(function (user) {
                _this.user = user;
                List.create({
                    title: 'Test list',
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
    describe('#create()', function () {
        it('should create a List object with the speficied userId', function (done) {
            List.create({
                title: 'Second list',
                userId: this.user.id
            })
                .then(function (list) {
                expect(list.title).toBe('Second list');
                expect(list.userId).toBe(1);
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not create a List without a userId', function (done) {
            List.create({
                title: 'some title'
            })
                .then(function (list) {
                expect(list).toBeUndefined();
                done();
            })
                .catch(function (err) {
                expect(err.message).toContain('List.userId cannot be null');
                done();
            });
        });
        it('should not create a List without a title', function (done) {
            List.create({
                userId: this.user.id
            })
                .then(function (list) {
                expect(list).toBeUndefined();
                done();
            })
                .catch(function (err) {
                expect(err.message).toContain('List.title cannot be null');
                done();
            });
        });
        // END LIST CREATE TEST
    });
    describe('#destroy()', function () {
        it('should destroy the list with associated list.id', function (done) {
            var _this = this;
            List.findOne({ where: { userId: this.user.id } })
                .then(function (list) {
                expect(list.title).toBe('Test list');
                List.destroy({ where: { id: list.id } })
                    .then(function (res) {
                    expect(res).toBe(1);
                    List.findOne({ where: { userId: _this.user.id } })
                        .then(function (deletedList) {
                        expect(deletedList).toBeNull();
                        done();
                    })
                        .catch(function (err) {
                        expect(err).toBeNull();
                    });
                })
                    .catch(function (err) {
                    expect(err).toBeNull();
                });
            })
                .catch(function (err) {
                expect(err).toBeNull();
            });
        });
        // END LIST DESTROY TEST
    });
    describe('#update()', function () {
        it('should update the title of the list with associated userId', function (done) {
            var _this = this;
            List.update({
                title: 'updated title'
            }, { where: { id: this.list.id } })
                .then(function () {
                // update does not return useful data
                List.findByPk(_this.list.id)
                    .then(function (list) {
                    expect(list.title).toBe('updated title');
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
        // END LIST UPDATE TEST
    });
    // END OF LIST USER SPEC
});
