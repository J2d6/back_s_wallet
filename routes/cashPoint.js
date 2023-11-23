var express = require('express');
const { depotUserMiddleware, retraitMiddleware } = require('../middlewares/cashPointMiddleware');


var router = express.Router();


router.post('/depot', depotUserMiddleware ) // cpContact, contact_user, fund
router.post('/retrait', retraitMiddleware ) // cpContact, contact_user, fund


module.exports = router