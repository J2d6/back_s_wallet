const { EMAIL_TO } = require("../config.app");
const genererCodeConfirmation = require("../lib/generateCode");
const { signJwt } = require("../lib/jwt");
const { sendConfirmationCodeMail } = require("../lib/mailing");
const { createUser, getUserByEmail } = require("../lib/user");


const subscriptionMidleware = async function (req, res, next) { //email
    try {
        if (getUserByEmail(req.body.email)) {
            res.status(400).json({
                message : "Email already used"
            })
        } else {
            const codeConfirmation = genererCodeConfirmation(6);
            const dataByMail = await sendConfirmationCodeMail(req.body.email, codeConfirmation)
            console.log(dataByMail);
            res.cookie('wn_sub',codeConfirmation)
            res.status(200).json({
                data : "Check email"
            })
        }
    } catch (error) {
        next(error)
    }
}

const confirmSubscriptionMiddleware = async function (req, res, next) { //req.body.email, 
    try {
        if (req.cookies.wn_sub === req.body.wn_sub) {
            if (req.body.marchand) {
                const _wn_api_key = await signJwt({
                    email : req.body.email
                })
                const dataByEmail = await sendConfirmationCodeMail(req.body.email,_wn_api_key);
                const user = await createUser({
                    nom : req.body.nom,
                    email : req.body.email,
                    contact : req.body.contact,
                    password : req.body.password,
                    marchand : true,
                    wn_API_key : _wn_api_key
                });
                res.status(200).json(user)
            } else {
                const user = await createUser({
                    nom : req.body.nom,
                    email : req.body.email,
                    contact : req.body.contact,
                    password : req.body.password,
                })
                res.status(200).json(user)
            }
        } else {
            res.status(400).json({
                message : "Code de confirmation incorrecte"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    subscriptionMidleware,
    confirmSubscriptionMiddleware
}