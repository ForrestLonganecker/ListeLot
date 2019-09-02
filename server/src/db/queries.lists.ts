const List = require('../db/models').List;

interface NewList {
  title: string,
  userId: number
}

interface List {
  id: number,
  title: string,
  updatedAt: string,
  createdAt: string
}

interface DeletedInfo {
  userId: number,
  listId: number
}

interface UpdatedInfo {
  updatedTitle: string,
  listId: number,
  userId: number
}

module.exports = {
  createList(newList: NewList, callback: Function){
    return List.create({
      title: newList.title,
      userId: newList.userId
    })
    .then((list: List) => {
      // remove the user.id from returned list for security purposes
      let returnList = {
        id: list.id,
        title: list.title,
        updatedAt: list.updatedAt,
        createdAt: list.createdAt
      };

      callback(null, returnList);
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  destroy(deletedInfo: DeletedInfo, callback: Function){
    List.findOne({where: {
      userId: deletedInfo.userId,
      id: deletedInfo.listId
      }
    })
    .then((list: List) => {
      if(list){
        List.destroy({where: {id: list.id}})
        .then((deletedList: Object) => {
          callback(null, deletedList);
        })
        .catch((err: string) => {
          callback(err);
        });
      }
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  update(updatedInfo: UpdatedInfo, callback: Function){
    List.update({
      title: updatedInfo.updatedTitle
    }, {where: {
      id: updatedInfo.listId,
      userId: updatedInfo.userId
    }})
    .then(() => {
      List.findByPk(updatedInfo.listId)
      .then((updatedList: List) => {
        let resultList = {
          title: updatedList.title,
          id: updatedList.id,
          createdAt: updatedList.createdAt,
          updatedAt: updatedList.updatedAt
        };

        callback(null, resultList);
      })
      .catch((err: string) => {
        callback(err);
      })
    })
    .catch((err: string) => {
      callback(err);
    });
  },
  getAll(userId: number, callback: Function){
    List.findAll({where: {userId: userId}})
    .then((lists: Array<List>) => {
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
    .catch((err: string) => {
      callback(err);
    });
  },
  getList(userId: number, listId: number, callback: Function){
    List.findOne({where: {
      id: listId,
      userId: userId
    }})
    .then((list: List) => {
      callback(null, list);
    })
    .catch((err: string) => {
      callback(err);
    });
  },
};