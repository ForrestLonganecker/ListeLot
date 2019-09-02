export {};
const authHelpers = require('../helpers/auth');
const listQueries = require('../db/queries.lists');
const userQueries = require('../db/queries.users');

interface Req {
  body: Body
};

interface Body {
  title: string,
  listId: number,
  updatedTitle: string
};

interface Res {
  status: any,
  sendStatus: Function,
  statusMessage: string,
  end: Function,
  send: Function
};

interface User {
  id: number
};

interface List {
  id: number
};

module.exports = {
  create(req: Req, res: Res){
    let token = authHelpers.hasToken(req);
    if(token){
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'Credentials do not match';
          res.end();
        } else {
          let newList = {
            title: req.body.title,
            userId: user.id
          };


          listQueries.createList(newList, (err: string, list: Array<List>) => {
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
  delete(req: Req, res: Res){
    let token = authHelpers.hasToken(req);
    if(token){
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'credentials do not match.';
          res.end();
        } else {
          let deleteInfo = {
            listId: req.body.listId,
            userId: user.id
          };

          listQueries.destroy(deleteInfo, (err: string, deletedList: List) => {
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
  update(req: Req, res: Res){
    let token = authHelpers.hasToken(req);

    if(token){
      userQueries.getUser(token.email, (err: string, user: User) => {
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

          listQueries.update(updateInfo, (err: string, updatedList: List) => {
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
  getAll(req: Req, res: Res){
    let token = authHelpers.hasToken(req);

    if(token){
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error when authenticating';
          res.end();
        } else {
          listQueries.getAll(user.id, (err: string, lists: Array<List>) => {
            if(err){
              res.status(400);
              res.statusMessage = 'error fetching lists';
              res.end();
            } else {
              res.send(lists);
            };
          });
        };
      });
    } else {
      res.status(400);
      res.statusMessage = 'error when authenticating';
      res.end();
    };
  },
};