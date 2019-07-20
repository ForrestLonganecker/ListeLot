// File to import and initialize all middleware for api

const logger = require('morgan');
const bodyParser = require('body-parser');


module.exports = {
  init(app, express){
    app.use(logger('dev'));
    app.use(bodyParser.json());
  }
};