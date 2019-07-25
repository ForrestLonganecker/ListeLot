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
};