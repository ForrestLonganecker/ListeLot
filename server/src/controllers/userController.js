// import helper functions
const authHelpers = require('../helpers/auth');
// import database manipulation functions
const userQueries = require('../db/queries.users');

module.exports = {
  create(req, res){
    let newUser = {
      email: req.body.email,
      password: authHelpers.encryptPassword(req.body.password)
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        res.status(400);
        res.send(err);
      } else {
        
        if(authHelpers.comparePasswords(req.body.password, user.password)){
          // If password matches create a jwt and send it to front end
          let data = authHelpers.createToken(user.email);
          res.send(data);
        } else {
          res.status(400);
          let err = {message: 'Log in credentials do not match.'};
          res.send(err);
        };
      };
    });
  },
  logIn(req, res){
    userQueries.getUser(req.body.email, (err, user) => {
      if(err){
        res.status(400);
        res.statusMessage = 'Log in credentials do not match';
        res.send(err);
      } else {

        if(authHelpers.comparePasswords(req.body.password, user.password)){
          let data = authHelpers.createToken(user.email);
          res.send(data);
        } else {
          res.status(400);
          res.statusMessage = 'Log in credentials do not match.';
          res.send(err);
        };
      };
    });
  },
  async authenticate(req, res){
    // if there is a token that matches in the req return it, else false
    let token = authHelpers.hasToken(req);
    if(token){
      // check for user in db
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          res.statusMessage = 'Not authenticated';
          res.send(err);
        } else {
          // if user exists in db create a new token and send it to the front
          let newToken = authHelpers.createToken(user.email);
          res.send(newToken);
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'Not authenticated';
      res.send();
    };
  },
};