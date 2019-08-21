express = require('express');
var router = express.Router();
var listItemController = require('../controllers/listItemController');
router.post('/listItems/create', listItemController.create);
router.post('/listItems/delete', listItemController.delete);
router.post('/listItems/update', listItemController.update);
router.post('/listItems/completed', listItemController.completed);
router.post('/listItems/activeList', listItemController.activeList);
module.exports = router;
