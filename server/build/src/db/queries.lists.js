"use strict";
var List = require('../db/models').List;
module.exports = {
    createList: function (newList, callback) {
        return List.create({
            title: newList.title,
            userId: newList.userId
        })
            .then(function (list) {
            // remove the user.id from returned list for security purposes
            var returnList = {
                id: list.id,
                title: list.title,
                updatedAt: list.updatedAt,
                createdAt: list.createdAt
            };
            callback(null, returnList);
        })
            .catch(function (err) {
            callback(err);
        });
    },
    destroy: function (deletedInfo, callback) {
        List.findOne({ where: {
                userId: deletedInfo.userId,
                id: deletedInfo.listId
            }
        })
            .then(function (list) {
            if (list) {
                List.destroy({ where: { id: list.id } })
                    .then(function (deletedList) {
                    callback(null, deletedList);
                })
                    .catch(function (err) {
                    callback(err);
                });
            }
        })
            .catch(function (err) {
            callback(err);
        });
    },
    update: function (updatedInfo, callback) {
        List.update({
            title: updatedInfo.updatedTitle
        }, { where: {
                id: updatedInfo.listId,
                userId: updatedInfo.userId
            } })
            .then(function () {
            List.findByPk(updatedInfo.listId)
                .then(function (updatedList) {
                var resultList = {
                    title: updatedList.title,
                    id: updatedList.id,
                    createdAt: updatedList.createdAt,
                    updatedAt: updatedList.updatedAt
                };
                callback(null, resultList);
            })
                .catch(function (err) {
                callback(err);
            });
        })
            .catch(function (err) {
            callback(err);
        });
    },
    getAll: function (userId, callback) {
        List.findAll({ where: { userId: userId } })
            .then(function (lists) {
            var returnLists = lists.map(function (list) {
                // remove userId from list
                var updatedItem = {
                    id: list.id,
                    title: list.title,
                    createdAt: list.createdAt,
                    updatedAt: list.updatedAt
                };
                return updatedItem;
            });
            callback(null, returnLists);
        })
            .catch(function (err) {
            callback(err);
        });
    },
    getList: function (userId, listId, callback) {
        List.findOne({ where: {
                id: listId,
                userId: userId
            } })
            .then(function (list) {
            callback(null, list);
        })
            .catch(function (err) {
            callback(err);
        });
    },
};
