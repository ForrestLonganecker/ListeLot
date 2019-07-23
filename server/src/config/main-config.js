// File to import and initialize all middleware for api

const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = {
  init(app, express){
    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
  }
};