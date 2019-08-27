const List = require('../db/models').List;

module.exports = {
  createList(newList, callback){
    return List.create({
      title: newList.title,
      userId: newList.userId
    })
    .then((list) => {
      // remove the user.id from returned list for security purposes
      let returnList = {
        id: list.id,
        title: list.title,
        updatedAt: list.updatedAt,
        createdAt: list.createdAt
      };

      callback(null, returnList);
    })
    .catch((err) => {
      callback(err);
    });
  },
  destroy(deletedInfo, callback){
    List.findOne({where: {
      userId: deletedInfo.userId,
      id: deletedInfo.listId
      }
    })
    .then((list) => {
      if(list){
        List.destroy({where: {id: list.id}})
        .then((deletedList) => {
          callback(null, deletedList);
        })
        .catch((err) => {
          callback(err);
        });
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
  update(updateInfo, callback){
    List.update({
      title: updateInfo.updatedTitle
    }, {where: {
      id: updateInfo.listId,
      userId: updateInfo.userId
    }})
    .then(() => {
      List.findByPk(updateInfo.listId)
      .then((updatedList) => {
        let resultList = {
          title: updatedList.title,
          id: updatedList.id,
          createdAt: updatedList.createdAt,
          updatedAt: updatedList.updatedAt
        };

        callback(null, resultList);
      })
      .catch((err) => {
        callback(err);
      })
    })
    .catch((err) => {
      callback(err);
    });
  },
  getAll(userId, callback){
    List.findAll({where: {userId: userId}})
    .then((lists) => {
      let returnLists = lists.map((list) => {
        // remove userId from list
        let updatedItem = {
          id: list.id,
          title: list.title,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt
        };
        return updatedItem;
      });

      callback(null, returnLists);
    })
    .catch((err) => {
      callback(err);
    });
  },
  getList(userId, listId, callback){
    List.findOne({where: {
      id: listId,
      userId: userId
    }})
    .then((list) => {
      callback(null, list);
    })
    .catch((err) => {
      callback(err);
    });
  },
};