const jwt = require('jsonwebtoken');



const generateToken = ( payload ) => {

    return new Promise(( resolve, reject) => {
         
        jwt.sign( { uid : payload }, process.env.JWT_SECRET_KEY ,{
            expiresIn : '1h'
        } , (err , token) => {
            if(err) reject(err)
            resolve(token);
        } )
    })
}



module.exports = {
    generateToken
}