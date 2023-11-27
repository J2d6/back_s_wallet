const { PrismaClient } = require("@prisma/client")

const typeTransaction = {
    p2p : "Transfert P2P",
    depot : "Dépôt",
    retrait : "Retrait",
    recharge : "Recharge"
}


const getTransactionTaxe = function (amount) {
    return (amount * 1,3 )/100
}

const prisma = new PrismaClient()


const getTransactionsById = async function (user_id) {
    try {
        const transactions = await prisma.user.findUnique({
            where : {
                user_id : +user_id
            },
            include : {
                receivers : true,
                senders : true
            }
        })
        return transactions;
    } catch (error) {
        throw new Error(error.message)
    }
}

const createTransaction = async function (receiver_id, sender_id, type, fund) {
    try {
        const transaction = await prisma.transaction.create({
            data : {
                receiver_id : +receiver_id,
                sender_id : +sender_id,
                type_transaction : type, 
                amount : +fund,
                frais_transaction : +getTransactionTaxe(+fund)
            }
        })
        return transaction;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createTransaction,
    typeTransaction,
    getTransactionsById,
    getTransactionTaxe
}