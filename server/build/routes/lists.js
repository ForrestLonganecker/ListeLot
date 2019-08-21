"use strict";
var express = require('express');
var router = express.Router();
var listController = require('../controllers/listController');
router.post('/lists/create', listController.create);
router.post('/lists/delete', listController.delete);
router.post('/lists/update', listController.update);
router.get('/lists/getAll', listController.getAll);
module.exports = router;
