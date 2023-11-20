var express = require('express');
const subscription = require('../middlewares/subscription');
var router = express.Router();


router.post("/sub", subscription)

module.exports = router