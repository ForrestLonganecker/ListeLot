var express = require('express');
// create a router
var router = express.Router();
// import the controller
var staticController = require('../controllers/staticController');
// set up a route for the req.endpoint '/'
// use staticController.index command when accessed
router.get('/', staticController.index);
module.exports = router;
