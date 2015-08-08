'use strict';

var express = require('express');
var controller = require('./restaurants.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
