var express = require('express');
const { getUniqueUser, getAllUsers, updateUserMiddleware, deleteUserMiddleware, findSimilarUsersMiddleware } = require('../middlewares/userMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/get', getUniqueUser);
router.get('/all', getAllUsers);
router.post('/update', updateUserMiddleware) //ACCEPT QUERYSTRING user_id AND USER OBJECT MUST BE IN THE RQ'S BPDY
router.get('/delete', deleteUserMiddleware) // QUERY STRING user_id ** REQUIRED **
router.get('/find', findSimilarUsersMiddleware)


module.exports = router;
