const userQueries = require('../db/queries.users');

module.exports = {
  create(req, res){
    let newUser = {
      email: req.body.email,
      password: req.body.password
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        res.status(400);
        res.send(err);
      } else {
        res.send(user);
      }
    });
  },
};