const { rechargerCP } = require("../lib/admin");
const { crediterUser } = require("../lib/user");

const rechargerCPMiddleware = async function (req, res, next) {
    try {
        const cp = await crediterUser(req.body.contact, +req.body.fund);
        if (cp) {
            res.status(200).json({
                data : cp
            })
        } else {
            res.status(400).json({
                message : "Compte introuvable"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    rechargerCPMiddleware
}