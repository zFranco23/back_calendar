const { response } = require('express');
const jwt = require('jsonwebtoken');


const validateToken = ( req , res=response , next) => {
    try{

        const token = req.header('x-token');

        if(!token){
            return res.status(401).json({
                ok : false,
                mssg : 'Token left'
            })
        }
        const { uid , name } = jwt.verify(token , process.env.JWT_SECRET_KEY);

        req.user = uid;
        req.user_name = name;

        next();
    }catch(err){
        console.log(err);

        res.status(400).json({
            ok : false,
            mssg : 'Invalid or expired token'
        })
    }
}

module.exports = validateToken