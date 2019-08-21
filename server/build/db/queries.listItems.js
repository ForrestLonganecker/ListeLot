var ListItem = require('../db/models').ListItem;
module.exports = {
    createListItem: function (newListItem, callback) {
        return ListItem.create({
            text: newListItem.text,
            listId: newListItem.listId
        })
            .then(function (listItem) {
            var returnItem = listItem.dataValues;
            callback(null, returnItem);
        })
            .catch(function (err) {
            callback(err);
        });
    },
    destroy: function (listItemId, callback) {
        ListItem.destroy({ where: { id: listItemId } })
            .then(function (deletedListItem) {
            callback(null, deletedListItem);
        })
            .catch(function (err) {
            callback(err);
        });
    },
    updateText: function (updateInfo, callback) {
        ListItem.update({
            text: updateInfo.text
        }, { where: {
                id: updateInfo.listItemId,
                listId: updateInfo.listId
            } })
            .then(function () {
            ListItem.findByPk(updateInfo.listItemId)
                .then(function (updatedListItem) {
                var returnItem = updatedListItem, dataValues;
                callback(null, returnItem);
            })
                .catch(function (err) {
                callback(err);
            });
        })
            .catch(function (err) {
            callback(err);
        });
    },
    completed: function (updateInfo, callback) {
        ListItem.update({
            isComplete: updateInfo.completed
        }, { where: {
                id: updateInfo.listItemId,
                listId: updateInfo.listId
            } })
            .then(function (res) {
            callback(null, res);
        })
            .catch(function (err) {
            callback(err);
        });
    },
    getAll: function (listId, callback) {
        ListItem.findAll({ where: { listId: listId } })
            .then(function (items) {
            var listItems = items.map(function (item) {
                return item.dataValues;
            });
            callback(null, listItems);
        })
            .catch(function (err) {
            callback(err);
        });
    },
};
