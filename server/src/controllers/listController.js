const authHelpers = require('../helpers/auth');
const listQueries = require('../db/queries.lists');
const userQueries = require('../db/queries.users');

module.exports = {
  create(req, res){
    let token = authHelpers.hasToken(req)
    if(token){
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'Credentials do not match';
          res.send(err);
        } else {
          let newList = {
            title: req.body.title,
            userId: user.id
          };


          listQueries.createList(newList, (err, list) => {
            if(err){
              res.status(400);
              res.statusMessage = 'error while creating list.';
              res.end();
            } else {
              // return object is list without list.userId
              let data = list;
              res.send(data);
            };
          });
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'error while authenticating.';
      res.end();
    };
  },
  delete(req, res){
    let token = authHelpers.hasToken(req);
    if(token){
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'credentials do not match.';
          res.end();
        } else {
          let deleteInfo = {
            listId: req.body.listId,
            userId: user.id
          };

          listQueries.destroy(deleteInfo, (err, deletedList) => {
            if(err){
              res.status(400);
              res.statusMessage = 'error creating list.';
              res.end();
            } else {
              res.sendStatus(200)
            };
          });
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'error while authenticating.';
      res.end();
    };
  },
  update(req, res){
    let token = authHelpers.hasToken(req);

    if(token){
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error when authenticating';
          res.end();
        } else {
          let updateInfo = {
            updatedTitle: req.body.updatedTitle,
            listId: req.body.listId,
            userId: user.id
          };

          listQueries.update(updateInfo, (err, updatedList) => {
            if(err){
              res.status(400);
              res.statusMessage = 'error updating list'
              res.end()
            } else {
              res.send(updatedList);
            };
          });
        };
      })
    } else {
      res.status(400);
      res.statusMessage = 'error when authenticating';
      res.end();
    };
  },
};