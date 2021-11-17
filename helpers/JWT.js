const jwt = require('jsonwebtoken');



const generateToken = ( { uid , name } ) => {

    return new Promise(( resolve, reject) => {
         
        jwt.sign( { uid , name }, process.env.JWT_SECRET_KEY ,{
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