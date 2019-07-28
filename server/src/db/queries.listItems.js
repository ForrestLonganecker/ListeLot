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
};