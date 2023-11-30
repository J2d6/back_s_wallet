const { PrismaClient } = require("@prisma/client")

const typeTransaction = {
    p2p : "Transfert P2P",
    depot : "Dépôt",
    retrait : "Retrait",
    recharge : "Recharge",
    marchand : "Paiement marchand"
}


const getTransactionTaxe = function (amount) {
    return (amount * 1,3 )/100
}

const prisma = new PrismaClient()


const getSpecificTransaction = async function (id_transaction ){
    try {
        const transaction = await prisma.transaction.findUnique({
            where : {
                id_trasaction : +id_transaction
            }, 
            include : {
                receiver : {
                    select : {
                        nom : true
                    }
                },
                sender : {
                    select : {
                        nom : true
                    }
                }
            }
        })
        return transaction;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getTransactionsById = async function (user_id, nb = null) {
    try {
        let transactions = null;
        if (nb) {
            transactions = await prisma.transaction.findMany({
                where: {
                  OR: [
                    { receiver_id: +user_id },
                    { sender_id: +user_id }
                  ],
                },
                include: {
                  receiver: {
                    select: { nom: true }
                  },
                  sender: {
                    select: { nom: true }
                  }
                },
                take : +nb,
                orderBy : {
                    date_transaction : 'desc'
                }
              });
        } else {
            transactions = await prisma.transaction.findMany({
                where: {
                  OR: [
                    { receiver_id: +user_id },
                    { sender_id: +user_id }
                  ],
                },
                include: {
                  receiver: {
                    select: { nom: true }
                  },
                  sender: {
                    select: { nom: true }
                  }
                },
                orderBy : {
                    date_transaction : 'desc'
                }
              });
        }
        
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
    getTransactionTaxe,
    getSpecificTransaction
}