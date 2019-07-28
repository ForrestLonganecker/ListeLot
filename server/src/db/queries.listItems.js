const ListItem = require('../db/models').ListItem;

module.exports = {
  createListItem(newListItem, callback){
    return ListItem.create({
      text: newListItem.text,
      listId: newListItem.listId
    })
    .then((listItem) => {
      let returnItem = listItem.dataValues;

      callback(null, returnItem);
    })
    .catch((err) => {
      callback(err);
    });
  },
  destroy(listItemId, callback){
    ListItem.destroy({where: {id: listItemId}})
    .then((deletedListItem) => {
      callback(null, deletedListItem);
    })
    .catch((err) => {
      callback(err);
    });
  },
  updateText(updateInfo, callback){
    ListItem.update({
      text: updateInfo.text
    }, {where: {
      id: updateInfo.listItemId,
      listId: updateInfo.listId
    }})
    .then(() => {
      ListItem.findByPk(updateInfo.listItemId)
      .then((updatedListItem) => {
        let returnItem = updatedListItem,dataValues;
        callback(null, returnItem);
      })
      .catch((err) => {
        callback(err);
      });
    })
    .catch((err) => {
      callback(err);
    });
  },
  completed(updateInfo, callback){
    ListItem.update({
      isComplete: updateInfo.completed
    }, {where: {
      id: updateInfo.listItemId,
      listId: updateInfo.listId
    }})
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err);
    });
  },
  getAll(listId, callback){
    ListItem.findAll({where: {listId: listId}})
    .then((items) => {
      let listItems = items.map(item => {
        return item.dataValues;
      });
      
      callback(null, listItems);
    })
    .catch((err) => {
      callback(err);
    });
  },
};