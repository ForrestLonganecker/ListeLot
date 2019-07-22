express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/users/create', userController.create);
router.post('/users/logIn', userController.logIn);

router.get('/users/authenticate', userController.authenticate);

module.exports = router;