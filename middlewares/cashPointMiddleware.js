const{ createTransaction, typeTransaction, getTransactionTaxe } = require("../lib/transactions");
const { crediterUser, debiterUser, getUSerByContact, debiterUserWithTaxes} = require("../lib/user");


const depotUserMiddleware = async function (req, res, next) { // cpContact, contact_user, fund
    try {
        const  cp = await getUSerByContact(req.body.cpContact);
        if (cp.soldeActuel >= (+req.body.fund + getTransactionTaxe(+req.body.fund)) ) {
            const user = await getUSerByContact(req.body.contact_user);
            const creditUser = await crediterUser(req.body.contact_user, +req.body.fund);
            const debituser = await debiterUser(req.body.cpContact, +req.body.fund);
            const transaction = await createTransaction(user.user_id, cp.user_id, typeTransaction.depot, req.body.fund);
            res.status(200).json({
                data : transaction
            })

        } else {
            res.status(400).json({
                message : "Solde insuffisant"
            })
        }
    } catch (error) {
        next(error)
    }
}

const retraitMiddleware = async function (req, res, next) { // contact_user, fund, cpContact
    try {
        const user = await getUSerByContact(req.body.contact_user);
        if ( user.soldeActuel >= (+req.body.fund + getTransactionTaxe(+req.body.fund)) ) {
            const creditUser = await crediterUser(req.body.cpContact,+req.body.fund);
            const debitUser = await debiterUserWithTaxes(req.body.contact_user, +req.body.fund);
            const transaction = await createTransaction(creditUser.user_id,debitUser.user_id, typeTransaction.retrait, +req.body.fund);

            res.status(200).json({
                data : transaction
            })
        } else {
            res.status(400).json({
                message : "Solde insuffisant"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    depotUserMiddleware,
    retraitMiddleware
}