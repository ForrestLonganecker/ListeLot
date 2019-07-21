const User = require('../db/models').User;

module.exports = {
  createUser(newUser, callback){
    User.findOne({where: {email: newUser.email}})
    .then((user) => {
      if(user){
        callback('email already in use');
      } else {
        return User.create({
          email: newUser.email,
          password: newUser.password
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        });
      };
    });
  },
  getUser(email, callback){
    User.findOne({where: {email: email}})
    .then((user) => {
      if(user){
        callback(null, user);
      }
    })
    .catch((err) => {
      callback(err);
    });
  },
};