export {};
const express = require('express');
// create a router
const router = express.Router();

// import the controller
const staticController = require('../controllers/staticController');

// set up a route for the req.endpoint '/'
// use staticController.index command when accessed
router.get('/', staticController.index);

module.exports = router;