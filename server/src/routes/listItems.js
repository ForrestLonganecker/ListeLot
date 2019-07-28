express = require('express');
const router = express.Router();

const listItemController = require('../controllers/listItemController');

router.post('/listItems/create', listItemController.create);
router.post('/listItems/delete', listItemController.delete);

module.exports = router;