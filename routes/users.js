var express = require('express');
const { getUniqueUser, getAllUsers, updateUserMiddleware, deleteUserMiddleware, findSimilarUsersMiddleware, getTransactionsByIdMiddleware, trasnfertP2PMiddleware } = require('../middlewares/userMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/get', getUniqueUser);
router.get('/all', getAllUsers);
router.post('/update', updateUserMiddleware) //ACCEPT QUERYSTRING user_id AND USER OBJECT MUST BE IN THE RQ'S BPDY
router.get('/delete', deleteUserMiddleware) // QUERY STRING user_id ** REQUIRED **
router.get('/find', findSimilarUsersMiddleware)
router.get('/transaction', getTransactionsByIdMiddleware) // MANDRAY query string "?nb=<nombre de transactionvoulu> sinon tonga de jiaby" ... efa par ordre décroissante
router.post('/p2p', trasnfertP2PMiddleware ) // req.body.contact_receiver, req.body.contact_sender, req.body.fund

module.exports = router;
