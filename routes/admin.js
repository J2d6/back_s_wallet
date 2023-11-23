var express = require('express');
const { desableUserMiddleware, enableUserMiddleware } = require('../middlewares/userMiddleware');
const { rechargerCPMiddleware } = require('../middlewares/adminMiddlewares');
var router = express.Router();

router.post('/desable', desableUserMiddleware) // MAIL WITHIN REQ'Q BODY
router.get('/enable',enableUserMiddleware)
router.post('/cp/recharge', rechargerCPMiddleware) // body : contact, fund(solde ho rechargena)

module.exports = router