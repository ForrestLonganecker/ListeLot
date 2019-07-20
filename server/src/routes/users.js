express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/users/create', userController.create);

module.exports = router;