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
    }
  },
};