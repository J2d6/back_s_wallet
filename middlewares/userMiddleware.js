const { getTransactionsById, getTransactionTaxe, createTransaction, typeTransaction, getSpecificTransaction } = require("../lib/transactions");
const { getUserById, getUserByEmail, getUSerByContact, getUsers, updateUser, deleteUser, desableUser, findSimilarUsers, debiterUserWithTaxes, crediterUser } = require("../lib/user");



const getSpecificTransactionMiddleware = async function (req, res, next) {
    try {
        const transaction = await getSpecificTransaction(+req.query?.id);
        if (transaction) {
            res.status(200).json({
                data : transaction
            })
        } else {
            res.status(400).json({
                message : "Objet non trové"
            })
        }
    } catch (error) {
        next(error)
    }
}

const trasnfertP2PMiddleware = async function (req, res, next) {
    try {
        let userToTransfer = await getUSerByContact(req.body.contact_receiver);
        if (userToTransfer) {
            const userWhoTransfer = await getUSerByContact(req.body.contact_sender);
            if (userWhoTransfer.soldeActuel < (+req.body.fund + getTransactionTaxe(+req.body.fund))) {
                res.status(400).json({
                    message : "Solde insuffisant"
                })
            } else {
                await debiterUserWithTaxes(req.body.contact_sender, +req.body.fund);
                await crediterUser(req.body.contact_receiver, +req.body.fund);
                const transaction = await createTransaction(req.body.contact_receiver, req.body.contact_sender, typeTransaction.p2p, +req.body.fund)

                res.status(200).json({
                    data : transaction
                })
            }
        } else {
            res.status(400).json({
                message : "Client recepteur non trouvé"
            })
        }
    } catch (error) {
        next(error)
    }
}


const getTransactionsByIdMiddleware = async function (req, res, next) {
    try {
        let transactions = null;
        if (req.query?.nb) {
            transactions = await getTransactionsById(req.query?.user_id, +req.quer.nb);
            res.status(200).json({
                data : transactions
            })
        } else {
            transactions = await getTransactionsById(req.query?.user_id);
            res.status(200).json({
                data : transactions
            })
        }

    } catch (error) {
        next(error)
    }
}


const findSimilarUsersMiddleware = async function (req, res, next) {
    try {
        const usersFound = await findSimilarUsers(req.query?.q);
        res.status(200).json({data : usersFound})
    } catch (error) {
        next(error)
    }
}


const desableUserMiddleware = async function (req, res, next) {
    try {
        const user = await desableUser(req.query?.user_id);
        if (user) {
            res.status(200).json({
                data : user
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
const enableUserMiddleware = async function (req, res, next) {
    try {
        const user = await enableUser(req.query?.user_id);
        if (user) {
            res.status(200).json({
                data : user
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

const getUniqueUser = async function (req, res, next) {
    let user = null ;
    try {
        if (req.query?.user_id) {
            user = await getUserById(req.query?.user_id);
        } else {
            if (req.query?.email) {
                user = await getUserByEmail(req.query?.email);
            } else {
                if (req.query?.contact) {
                    user = await getUSerByContact(req.query?.contact);
                } 
            }
        } 
        if (user) {
            res.status(200).json({
                data : user
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

const getAllUsers = async function (req, res, next) {
    try {
        const nb = +req.query?.nb || 0
        const allUsers = await getUsers(nb);
        res.status(200).json({
            data : allUsers
        })        
    } catch (error) {
        next(error)
    }
}

const updateUserMiddleware = async function (req, res, next) {
    try {
        const updatedUser = await updateUser(+req.query?.user_id, req.body)
        if (updatedUser) { //IF UPDATED
            res.status(200).json({
                data : updatedUser
            })
        } else { // NOT FOUND
            res.status(400).json({
                message : "Compte introuvable"
            })
        }
    } catch (error) {
        next(error)
    }
}
const deleteUserMiddleware = async function (req, res, next) {
    try {
        const deletedUser = await deleteUser(+req.query?.user_id);
        if (deletedUser) { //IF UPDATED
            res.status(200).json({
                data : deletedUser
            })
        } else { // NOT FOUND
            res.status(400).json({
                message : "Compte introuvable"
            })
        }
    } catch (error) {
        next(error.message)
    }
}

module.exports =  {
   getUniqueUser,
   getAllUsers,
   updateUserMiddleware,
   deleteUserMiddleware,
   desableUserMiddleware,
   enableUserMiddleware,
   findSimilarUsersMiddleware,
   getTransactionsByIdMiddleware,
   trasnfertP2PMiddleware, 
   getSpecificTransactionMiddleware
}
