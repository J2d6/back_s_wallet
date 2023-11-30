var express = require('express');
const { subscriptionMidleware, confirmSubscriptionMiddleware } = require('../middlewares/subscription');

var router = express.Router();


router.post("/sub", subscriptionMidleware);
router.post("/sub/confirm", confirmSubscriptionMiddleware);

module.exports = router