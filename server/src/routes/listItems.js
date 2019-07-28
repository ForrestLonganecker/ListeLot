express = require('express');
const router = express.Router();

const listItemController = require('../controllers/listItemController');

router.post('/listItems/create', listItemController.create);
router.post('/listItems/delete', listItemController.delete);
router.post('/listItems/update', listItemController.update);

module.exports = router;