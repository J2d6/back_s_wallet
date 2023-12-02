var express = require('express');
const { subscriptionMidleware, confirmSubscriptionMiddleware, confirmSubscriptionMiddlewareAgent } = require('../middlewares/subscription');

var router = express.Router();


router.post("/sub", subscriptionMidleware);
router.post("/confirm", confirmSubscriptionMiddleware);
router.post("/confirmAgent", confirmSubscriptionMiddlewareAgent);

module.exports = router