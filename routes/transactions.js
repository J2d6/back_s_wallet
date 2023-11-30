var express = require('express');
const { getSpecificTransactionMiddleware } = require('../middlewares/userMiddleware');
var router = express.Router();


router.get('/', getSpecificTransactionMiddleware)


module.exports = router