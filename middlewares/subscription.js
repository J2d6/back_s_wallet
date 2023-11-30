const { PrismaClient } = require("@prisma/client");
const { EMAIL_TO } = require("../config.app");
const genererCodeConfirmation = require("../lib/generateCode");
const { signJwt } = require("../lib/jwt");
const { sendConfirmationCodeMail, sendMarchandKeyMail } = require("../lib/mailing");
const { createUser, getUserByEmail } = require("../lib/user");

const prisma = new PrismaClient()

const subscriptionMidleware = async function (req, res, next) { //email
    try {
        const client = await getUserByEmail(req.body.email);
        if (client) {
            res.status(400).json({
                message : "Email already used"
            })
        } else {
            const codeConfirmation = genererCodeConfirmation(6);
            const CODE = await prisma.codeConfirmation.create({
                data : {
                    code : codeConfirmation
                }
            })
            const dataByMail = await sendConfirmationCodeMail(req.body.email, codeConfirmation)
            console.log(dataByMail);
            // res.cookie('wn_sub',codeConfirmation)
            res.status(200).json({
                data : CODE.id_code,
                message : "Check email"
            })
        }
    } catch (error) {
        next(error)
    }
}

const confirmSubscriptionMiddleware = async function (req, res, next) { //req.body.email, 
    try {
        const CODE = await prisma.codeConfirmation.findUnique({
            where : {
                id_code : +req.body.id
            }
        })
        if (CODE.code === req.body.wn_sub) {
            if (req.body.marchand) { //tsmaintsy présent
                const _wn_api_key = await signJwt({
                    email : req.body.email
                })
                const dataByEmail = await sendMarchandKeyMail(req.body.email,_wn_api_key);
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
                if (req.body.cash_point) {
                    const user = await createUser({
                        nom : req.body.nom,
                        email : req.body.email,
                        contact : req.body.contact,
                        password : req.body.password,
                        cash_point : true
                    })
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