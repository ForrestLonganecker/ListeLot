export {};
// import helper functions
const authHelpers = require('../helpers/auth');
// import database manipulation functions
const userQueries = require('../db/queries.users');

interface Req {
  body: Body
};

interface Body {
  email: string,
  password: string,
};

interface Res {
  status: any,
  sendStatus: Function,
  statusMessage: string,
  end: Function,
  send: Function
};

interface User {
  id: number,
  email: string,
  password: string
};

interface List {
  id: number
};

module.exports = {
  create(req: Req, res: Res){
    let newUser = {
      email: req.body.email,
      password: authHelpers.encryptPassword(req.body.password)
    };

    userQueries.createUser(newUser, (err: string, user: User) => {
      if(err){
        res.status(400);
        res.statusMessage = err;
        res.end()
      } else {
        
        if(authHelpers.comparePasswords(req.body.password, user.password)){
          // If password matches create a jwt and send it to front end
          let data = authHelpers.createToken(user.email);
          res.send(data);
        } else {
          res.status(400);
          res.statusMessage = 'Log in credentials do not match.';
          res.end();
        };
      };
    });
  },
  logIn(req: Req, res: Res){
    userQueries.getUser(req.body.email, (err: string, user: User) => {
      if(err){
        res.status(400);
        res.statusMessage = 'Log in credentials do not match.';
        res.end();
      } else {

        if(authHelpers.comparePasswords(req.body.password, user.password)){
          let data = authHelpers.createToken(user.email);
          res.send(data);
        } else {
          // status comes through as res.status
          res.status(400);
          // statusMessage comes through as res.statusText
          res.statusMessage = 'Log in credentials do not match.';
          res.end();
        };
      };
    });
  },
  authenticate(req: Req, res: Res){
    // if there is a token that matches in the req return it, else false
    let token = authHelpers.hasToken(req);
    if(token){
      // check for user in db
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'Not authenticated';
          res.end();
        } else {
          // if user exists in db create a new token and send it to the front
          let newToken = authHelpers.createToken(user.email);
          res.send(newToken);
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'Not authenticated';
      res.end();
    };
  },
};