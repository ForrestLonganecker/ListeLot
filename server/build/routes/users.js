express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
router.post('/users/create', userController.create);
router.post('/users/logIn', userController.logIn);
router.get('/users/authenticate', userController.authenticate);
module.exports = router;
