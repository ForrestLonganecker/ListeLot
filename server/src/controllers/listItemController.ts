export {};
const authHelpers = require('../helpers/auth');
const listQueries = require('../db/queries.lists');
const userQueries = require('../db/queries.users');
const listItemQueries = require('../db/queries.listItems');

interface Req {
  body: Body
};

interface Body {
  listId: number,
  text: string,
  listItemId: number,
  updatedText: string,
  completed: boolean
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

      // check fo a user with associated email
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // check for list with associated userid && listid
          listQueries.getList(user.id, req.body.listId, (err: string, list: List) => {
            if(err){
              res.status(400);
              res.statusMessage = 'Could not find a matching list';
              res.end();
            } else {
              let newListItem = {
                text: req.body.text,
                listId: list.id
              };

              listItemQueries.createListItem(newListItem, (err: string, listItem: Object) => {
                if(err){
                  res.status(400);
                  res.statusMessage = 'Error creating list item';
                  res.end();
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
  delete(req: Req, res: Res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          listQueries.getList(user.id, req.body.listId, (err: string, list: List) => {

            if(err){
              res.status(400);
              res.statusMessage = 'Error locating list';
              res.end();
            } else {

              listItemQueries.destroy(req.body.listItemId, (err: string, deletedListItem: Object) => {
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
  update(req: Req, res: Res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // locate the list associated with the user
          listQueries.getList(user.id, req.body.listId, (err: string, list: List) => {
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

              listItemQueries.updateText(updateInfo, (err: string, updatedListItem: Object) => {
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
  completed(req: Req, res: Res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // locate the list associated with the user
          listQueries.getList(user.id, req.body.listId, (err: string, list: List) => {
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

              listItemQueries.completed(updateInfo, (err: string, updatedItem: object) => {
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
  activeList(req: Req, res: Res){
    let token = authHelpers.hasToken(req);
    if(token){

      // check for a user with associated email
      userQueries.getUser(token.email, (err: string, user: User) => {
        if(err){
          res.status(400);
          res.statusMessage = 'error while authenticating';
          res.end();
        } else {

          // locate the list associated with the user
          listQueries.getList(user.id, req.body.listId, (err: string, list: List) => {
            if(err){
              res.status(400);
              res.statusMessage = 'Error locating list';
              res.end();
            } else {

              listItemQueries.getAll(list.id, (err: string, listItems: Object) => {
                if(err){
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
      res.status(400);
      res.statusMessage = 'error while authenticating';
      res.end();
    };
  },
};