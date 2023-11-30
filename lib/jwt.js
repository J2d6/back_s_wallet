const { jwtVerify ,  SignJWT} = require("jose");

const secretKey = new TextEncoder().encode(
    "SOLOFO_WALLET_L3",
  )

const alg = 'HS256'
  
const signJwt = async function (payloads) {
    try {
        const jwt = await new SignJWT(payloads)
            .setProtectedHeader({ alg })
            .sign(secretKey)
        
        return jwt ;
    } catch (error) {
        throw new Error(error.message)
    }
}

const verifyJWT = async function ( jwt , payloads) {
    try {
        const decodedJwt = await jwtVerify(jwt, payloads)
        return decodedJwt
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {
    signJwt
}