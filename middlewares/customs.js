const User = require('../models/user.model')


const existsUser = async ( email ='') => {

    const user = await User.findOne({ email})

    if(user){
        throw new Error(`User already exists with ${email}`)
    }

    return true;
}

module.exports = {
    existsUser
}