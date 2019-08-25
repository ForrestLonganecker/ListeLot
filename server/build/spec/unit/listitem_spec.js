"use strict";
var _this = this;
var sequelize = require('../../src/db/models/index').sequelize;
var User = require('../../src/db/models').User;
var List = require('../../src/db/models').List;
var ListItem = require('../../src/db/models').ListItem;
describe('ListItem', function () {
    beforeEach(function (done) {
        _this.user;
        _this.list;
        _this.listItem;
        sequelize.sync({ force: true })
            .then(function () {
            User.create({
                email: 'test@email.com',
                password: '123'
            })
                .then(function (user) {
                _this.user = user;
                List.create({
                    title: 'Test title',
                    userId: _this.user.id
                })
                    .then(function (list) {
                    _this.list = list;
                    ListItem.create({
                        text: 'list item test',
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
    describe('#create()', function () {
        it('should create a ListItem with the associated text and listId', function (done) {
            ListItem.create({
                text: 'second test list item',
                listId: _this.list.id
            })
                .then(function (listItem) {
                expect(listItem.id).toBe(2);
                expect(listItem.text).toBe('second test list item');
                expect(listItem.listId).toBe(_this.list.id);
                expect(listItem.isComplete).toBeFalsy();
                done();
            })
                .catch(function (err) {
                expect(err).toBeNull();
                done();
            });
        });
        it('should not create a ListItem without associated listId', function (done) {
            ListItem.create({
                text: 'second test list item',
            })
                .then(function (listItem) {
                // expect errors
                done();
            })
                .catch(function (err) {
                expect(err.message).toContain('listId cannot be null');
                done();
            });
        });
        // END CREATE LIST ITEM TEST
    });
    describe('#destroy()', function () {
        it('should destroy the ListItem with the specified ID', function (done) {
            ListItem.destroy({ where: { id: _this.listItem.id } })
                .then(function (res) {
                // res = number of modified rows in the table
                expect(res).toBe(1);
                ListItem.findByPk(_this.listItem.id)
                    .then(function (listItem) {
                    expect(listItem).toBeNull();
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
        // END DESTROY LIST ITEM TEST
    });
    describe('#update()', function () {
        it('should update the ListItem with the specified ID', function (done) {
            ListItem.update({
                text: 'updated text',
                isComplete: true
            }, { where: { id: _this.listItem.id } })
                .then(function (res) {
                // res = number of modified rows in the table
                expect(res[0]).toBe(1);
                ListItem.findByPk(_this.listItem.id)
                    .then(function (listItem) {
                    expect(listItem.text).toBe('updated text');
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
        // END UPDATE LIST ITEM TEST
    });
    // END LIST ITEM UNIT SPEC
});
