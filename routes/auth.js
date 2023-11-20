var express = require('express');
var router = express.Router();
const authmiddleware = require("../middlewares/authmiddleware")


router.post('/',authmiddleware)



module.exports = router ;