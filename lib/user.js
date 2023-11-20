const { Prisma, PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
/**
 * 
 * @param {String} email 
 */
const getUserByEmail = async function (email) {
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}

const createUser = async function (user) {
    try {
        const user = await prisma.user.create({
            data : user
        });
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}
const getUserById = async function (user_id) {
    try {
        const user = await prisma.user.findUnique({
            where : {
                user_id : +user_id
            }
        })
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUSerByContact = async function (contact) {
    try {
        const user = await prisma.user.findUnique({
            where : {
                contact : contact
            }
        })
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}
/**
 * 
 * @param { Number} number - Number of users needed
 */
const getUsers = async function ( number ) {
    try {
        let users = {}
        if (number) {
            users = await prisma.user.findMany({
                take : number
            })
        } else {
            users = await prisma.user.findMany()
        }
        return users;
        
    } catch (error) {
        throw new Error(error.message)
    }
}


const updateUser = async function (user_id, user) {
    try {
        let userToUpdate = await getUserById(+user_id)
        console.log(`USER TO UPDATE : ${userToUpdate}`);
        if (userToUpdate) {
            userToUpdate = await prisma.user.update({ // UPDATED
                where: {
                  user_id : +user_id,
                },
                data:user ,
            })
        } 
        
        return userToUpdate // UPDATED OR NULL
        
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteUser = async function (user_id) {
    try {
        let userToDelete = await getUserById(+user_id);
        if (userToDelete) {
            userToDelete = await prisma.user.delete({
                where : {
                    user_id : +user_id
                }
            })
        }      
        return userToDelete

    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {
    getUserByEmail,
    getUserById,
    getUSerByContact,
    getUsers,
    updateUser,
    deleteUser
}  ;