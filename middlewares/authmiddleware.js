const {getUserByEmail} = require("../lib/user")

const authmiddleware = async function (req, res, next) {
    try {
        const user = await getUserByEmail(req.body.email)
        if (user) {
            if (user.password === req.body.password) {
                res.cookie("jwt","s_wallet_jwt")
                res.status(200).json({
                    data : user
                })
            } else {
                res.status(400).json({
                    message : "Mot de passe incorrecte"
                })
            }
        } else {
            res.status(400).json({
                message : "Compte introuvable"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authmiddleware