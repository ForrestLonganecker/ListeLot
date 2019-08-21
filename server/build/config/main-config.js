// File to import and initialize all middleware for api
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
module.exports = {
    init: function (app, express) {
        app.use(logger('dev'));
        app.use(cors());
        app.use(bodyParser.json());
    }
};
