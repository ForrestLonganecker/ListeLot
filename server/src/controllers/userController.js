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
        res.send(err);
      } else {

        if(authHelpers.comparePasswords(req.body.password, user.password)){
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
  authenticate(req, res){
    let token = authHelpers.hasToken(req);
    // check for a token
    if(token){
      // if there is a token check for a user
      userQueries.getUser(token.email, (err, user) => {
        if(err){
          res.status(400);
          let err = {message: 'Not authenticated'};
          res.send(err);
        } else {
          // if there is a user create a new token with the user.email and send it
          let data = authHelpers.createToken(user.email);
          res.send(data);
        }
      });
    } else {
      res.status(400);
      let err = {message: 'Not authenticated'};
      res.send(err);
    };
  },
};