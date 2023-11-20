const genererCodeConfirmation = require("../lib/generateCode");
const { sendConfirmationCodeMail } = require("../lib/mailing");


const subscription = async function (req, res, next) {
    try {
        const codeConfirmation = genererCodeConfirmation(6);
        const dataByMail = await sendConfirmationCodeMail(req.body.email, codeConfirmation)
        console.log(dataByMail);
        res.status(200).end()
    } catch (error) {
        next(error)
    }
}

module.exports = subscription ;