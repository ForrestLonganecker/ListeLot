const ListItem = require('../db/models').ListItem;

interface NewListItem {
  text: string,
  listId: number
}

interface ListItem {
  dataValues: Object
}

interface UpdateInfo {
  text: string,
  listItemId: number,
  listId: number,
  completed: boolean
}

interface UpdatedListItem {
  dataValues: Object
}

interface Item {
  dataValues: Object
}

module.exports = { 
  createListItem(newListItem: NewListItem, callback: Function){
    return ListItem.create({
      text: newListItem.text,
      listId: newListItem.listId
    })
    .then((listItem: ListItem) => {
      let returnItem = listItem.dataValues;

      callback(null, returnItem);
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  destroy(listItemId: number, callback: Function){
    ListItem.destroy({where: {id: listItemId}})
    .then((deletedListItem: Object) => {
      callback(null, deletedListItem);
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  updateText(updateInfo: UpdateInfo, callback: Function){
    ListItem.update({
      text: updateInfo.text
    }, {where: {
      id: updateInfo.listItemId,
      listId: updateInfo.listId
    }})
    .then(() => {
      ListItem.findByPk(updateInfo.listItemId)
      .then((updatedListItem: UpdatedListItem) => {
        let returnItem = updatedListItem.dataValues;
        callback(null, returnItem);
      })
      .catch((err: string) => {
        callback(err);
      });
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  completed(updateInfo: UpdateInfo, callback: Function){
    ListItem.update({
      isComplete: updateInfo.completed
    }, {where: {
      id: updateInfo.listItemId,
      listId: updateInfo.listId
    }})
    .then((res: Array<number>) => {
      callback(null, res);
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  getAll(listId: number, callback: Function){
    ListItem.findAll({where: {listId: listId}})
    .then((items: Array<Item>) => {
      let listItems = items.map(item => {
        return item.dataValues;
      });
      
      callback(null, listItems);
    })
    .catch((err: string) => {
      callback(err);
    });
  },
};