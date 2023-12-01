const { PrismaClient } = require("@prisma/client")
const { getTransactionTaxe } = require("./transactions")
const prisma = new PrismaClient()




const debiterUserWithTaxes = async function (contact_user, fund) {
    try {
        let user = await prisma.user.findUnique({
            where : {
                contact : contact_user
            }
        })
        if (user) {
            user = await prisma.user.update({
                where : {
                    contact : contact_user
                },
                data : {
                    soldeActuel : user.soldeActuel - (+fund + getTransactionTaxe(+fund))
                }
            }) 
        }
        return user ; 
    } catch (error) {
        throw new Error(error.message)
    }
}


const crediterUser = async function (contactUser, fund) {
    try {
        let user = await prisma.user.findUnique({
            where : {
                contact : contactUser
            }
        })
        if (user) {
            user = await prisma.user.update({
                where : {
                    contact : contactUser
                },
                data : {
                    soldeActuel : user.soldeActuel + (+fund)
                }
            }) 
        }
        
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}

const debiterUser = async function (contactUser, fund) {
    try {
        let user = await prisma.user.findUnique({
            where : {
                contact : contactUser
            }
        })
        if (user) {
            user = await prisma.user.update({
                where : {
                    contact : contactUser
                },
                data : {
                    soldeActuel : user.soldeActuel - (+fund)
                }
            }) 
        }
        return user ; 
        
    } catch (error) {
        throw new Error(error.message);
    }
}

const findSimilarUsers = async function (param) {
        const whereClauses = [];
        try {
          if (param.length) {
            whereClauses.push({ email: { contains: param } });
            whereClauses.push({ contact: { contains: param } });
            whereClauses.push({ nom: { contains: param } });
      
            // Convertissez `param` en nombre et vérifiez s'il est NaN
            const userIdNumber = parseInt(param);
            if (!isNaN(userIdNumber)) {
              whereClauses.push({ user_id: { equals: userIdNumber } });
            }
            // Si `num_compte` existe dans votre modèle, ajoutez-le ici avec la vérification appropriée
          }
      
          const whereClause = { OR: whereClauses };
      
          const users = await prisma.user.findMany({ where: whereClause });
      
          return users;
        } catch (error) {
          throw new Error(error);
        }
      
};


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

const createUser = async function (client) {
    try {
        const user = await prisma.user.create({
            data : client
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

const desableUser = async function (idUser) {
    try {
        let userToDisable = await prisma.user.findUnique({
            where : {
                user_id : +idUser
            }
        })
        if (userToDisable) {
            user = await prisma.user.update({
                where : {
                    user_id : +idUser
                },
                data : {
                    isActive : false
                }
            })
        } 
        return userToDisable ;
    } catch (error) {
        throw new Error(error);
    }
}

const enableUser = async function (idUser) {
    try {
        let userToEnable = await prisma.user.findUnique({
            where : {
                user_id : +idUser
            }
        })
        if (userToEnable) {
            user = await prisma.user.update({
                where : {
                    user_id : +idUser
                },
                data : {
                    isActive : false
                }
            })
        } 
        return userToEnable ;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    getUSerByContact,
    getUsers,
    updateUser,
    deleteUser,
    desableUser,
    enableUser,
    findSimilarUsers,
    crediterUser,
    debiterUser,
    debiterUserWithTaxes,
    createUser
}  ;