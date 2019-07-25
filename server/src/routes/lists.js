express = require('express');
const router = express.Router();

const listController = require('../controllers/listController');

router.post('/lists/create', listController.create);
router.post('/lists/delete', listController.delete);
router.post('/lists/update', listController.update);

module.exports = router;