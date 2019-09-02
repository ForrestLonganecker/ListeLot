// File to import and initialize all middleware for api
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

interface App {
  use: Function
}

module.exports = {
  init(app: App){
    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
  }
};