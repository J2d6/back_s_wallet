const { PrismaClient } = require("@prisma/client");
const { getUSerByContact, crediterUser, debiterUser, debiterUserWithTaxes } = require("./user");
const { createTransaction, typeTransaction } = require("./transactions");

const prisma = new PrismaClient();

const payMarchand = async function (
    contact_client,
    contact_marchand, 
    amount,
) {
    try {
        // debit client avec taxe, 
        await debiterUserWithTaxes(contact_client, +amount)
        // credite le marchand
        await crediterUser(contact_marchand, +amount)
        // creer la transaction 
        const transaction = await createTransaction(contact_marchand, contact_client, typeTransaction.marchand, +amount);
        return transaction ;
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    payMarchand
}