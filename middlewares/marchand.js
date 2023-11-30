const { PrismaClient } = require("@prisma/client")
const { getUSerByContact } = require("../lib/user");
const { getTransactionTaxe } = require("../lib/transactions");
const { payMarchand } = require("../lib/marchand");



const payMarchandMiddleware = async function (req, res, next) {
    try {
        const marchand = await getUSerByContact(req.body.contact_marchand);
        const wn_API_key = marchand.wn_API_key;
        if (req.body.wn_API_key === wn_API_key) {
            const client = await getUSerByContact(req.body.contact_client);
            if (client.soldeActuel < (+req.body.amount + getTransactionTaxe(+req.body.amount))) {
                res.status(400).json({
                    message : "Solde insuffisant"
                })
            } else {
                const transaction = await payMarchand(req.body.contact_client, req.body.contact_marchand, +req.body.amount);
                res.status(200).json({
                    data : transaction
                })
            }
        } else {
            res.status(400).json({
                message : "Transaction refusé . Origine non identifié"
            })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    payMarchandMiddleware
}