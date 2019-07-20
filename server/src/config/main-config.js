// File to import and initialize all middleware for api

const logger = require('morgan');


module.exports = {
  init(app, express){
    app.use(logger('dev'));
  }
};