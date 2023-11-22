var express = require('express');
const { desableUserMiddleware, enableUserMiddleware } = require('../middlewares/userMiddleware');
var router = express.Router();

router.post('/desable', desableUserMiddleware) // MAIL WITHIN REQ'Q BODY
router.get('/enable',enableUserMiddleware)

module.exports = router