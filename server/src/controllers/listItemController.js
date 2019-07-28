const authHelpers = require('../helpers/auth');
const listQueries = require('../db/queries.lists');
const userQueries = require('../db/queries.users');
const listItemQueries = require('../db/queries.listItems');

module.exports = {
  create(req, res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check fo a user with associated email
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.send(err);
        } else {

          // check for list with associated userid && listid
          listQueries.getList(user.id, req.body.listId, (err, list) => {
            if(err){
              res.status(400);
              res.statusMessage = 'Could not find a matching list';
              res.send(err);
            } else {
              let newListItem = {
                text: req.body.text,
                listId: list.id
              };

              listItemQueries.createListItem(newListItem, (err, listItem) => {
                if(err){
                  res.status(400);
                  res.statusMessage = 'Error creating list item';
                  res.send(err);
                } else {
                  res.send(listItem);
                };
              });
            };
          });
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'error while authenticating';
      res.end();
    };
  },
  delete(req, res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          listQueries.getList(user.id, req.body.listId, (err, list) => {

            if(err){
              res.status(400);
              res.statusMessage = 'Error locating list';
              res.end();
            } else {

              listItemQueries.destroy(req.body.listItemId, (err, deletedListItem) => {
                if(err){
                  res.status(400);
                  res.statusMessage = 'Error deleting list item';
                  res.end();
                } else {
                  res.sendStatus(200);
                };
              });
            };
          });
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'error while authenticating';
      res.end();
    };
  },
};