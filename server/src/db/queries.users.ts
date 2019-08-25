const User = require('../db/models').User;

interface User {
  email: string,
  password: string 
}

module.exports = {
  createUser(newUser: User, callback: Function){
    User.findOne({where: {email: newUser.email}})
    .then((user: User) => {
      if(user){
        callback('email already in use');
      } else {
        return User.create({
          email: newUser.email,
          password: newUser.password
        })
        .then((user: User) => {
          callback(null, user);
        })
        .catch((err: string) => {
          let message = 'error creating user'
          callback(message);
        });
      };
    });
  },
  getUser(email: string, callback: Function){
    User.findOne({where: {email: email}})
    .then((user: User) => {
      if(user){
        callback(null, user);
      } else {
        let err = 'Match not found.';
        callback(err);
      }
    })
    .catch((err: string) => {
      callback(err);
    });
  },
};