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
  update(req, res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // locate the list associated with the user
          listQueries.getList(user.id, req.body.listId, (err, list) => {
            if(err){
              res.status(400);
              res.statusMessage = 'Error locating list';
              res.end();
            } else {
              let updateInfo = {
                listItemId: req.body.listItemId,
                listId: list.id,
                text: req.body.updatedText
              };

              listItemQueries.updateText(updateInfo, (err, updatedListItem) => {
                if(err){
                  res.status(400);
                  res.statusMessage = 'Error updating list item';;
                  res.end();
                } else {
                  res.send(updatedListItem)
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
  completed(req, res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // locate the list associated with the user
          listQueries.getList(user.id, req.body.listId, (err, list) => {
            if(err){
              res.status(400);
              res.statusMessage = 'Error locating list';
              res.end();
            } else {
              let updateInfo = {
                listItemId: req.body.listItemId,
                listId: list.id,
                completed: req.body.completed
              };

              listItemQueries.completed(updateInfo, (err, updatedItem) => {
                if(err){
                  res.status(400);
                  res.statusMessage = 'Error updating list item';
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
    }
  },
  activeList(req, res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          console.log('11111111111111111', err);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // locate the list associated with the user
          listQueries.getList(user.id, req.body.listId, (err, list) => {
            if(err){
              console.log('2222222222222222', err);
              res.status(400);
              res.statusMessage = 'Error locating list';
              res.end();
            } else {

              listItemQueries.getAll(list.id, (err, listItems) => {
                if(err){
                  console.log('33333333333333333333', err);
                  res.status(400);
                  res.statusMessage = 'Error retrieving items';
                  res.end();
                } else {
                  res.send(listItems);
                };
              });
            };
          });
        };
      });
    } else {
      console.log('4444444444444444444444')
      res.status(400);
      res.statusMessage = 'error while authenticating';
      res.end();
    };
  },
};