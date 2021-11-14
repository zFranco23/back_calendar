const { validationResult } = require('express-validator');



const validateFields = ( req , res , next) => {

    const { errors } = validationResult(req);

    if(errors.length > 0) return res.status(400).json( { ok : false , errors } );
    
    next();
}

module.exports = validateFields;