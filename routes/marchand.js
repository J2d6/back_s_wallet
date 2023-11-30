var express = require('express');
const { payMarchandMiddleware } = require('../middlewares/marchand');
var router = express.Router();

router.post('/pay', payMarchandMiddleware) // req.body.contact_marchand, req.body.contact_client, req.body.amount, req.body.amount, req.body.wn_API_key

module.exports = router