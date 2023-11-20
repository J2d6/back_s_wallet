const { getUserById, getUserByEmail, getUSerByContact, getUsers, updateUser, deleteUser } = require("../lib/user")


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
   deleteUserMiddleware
}
