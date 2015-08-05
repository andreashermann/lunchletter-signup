'use strict';

var express = require('express');
var controller = require('./email.controller');

var router = express.Router();

router.get('/pix.png', controller.view);

module.exports = router;
