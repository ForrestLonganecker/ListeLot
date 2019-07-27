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
}