const { response } = require("express");
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateToken } = require("../helpers/JWT");

const SALT = 10;

const newUser = async ( req , res = response) => {
    try{

        const { name , email , password } = req.body;

        const salt = bcrypt.genSaltSync(SALT);
        const hashed = bcrypt.hashSync(password, salt);
        const user = new User({ name, email , password : hashed});

        await user.save();

        const token = await generateToken({ uid : user._id , name });
        res.status(201).json({
            ok : true , 
            mssg : 'New User',
            uid : user.id,
            name : user.name,
            token
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}

const login = async ( req , res = response) => {
    try{

        const { email , password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok : false,
                mssg : 'User and password incorrect'
            })
        }

        const validPassword = bcrypt.compareSync(password,user.password);

        if(!validPassword){
            return res.status(400).json({
                ok : false,
                mssg : 'Password incorrect'
            })
        }

        const token = await generateToken( { uid : user._id , name: user.name});
        

        res.json({
            ok : true , 
            mssg : 'Login',
            uid : user.id,
            name : user.name,
            token
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}

const renewToken = async ( req , res = response) => {
    try{

        const uid = req.user;
        const name = req.user_name;

        const token = await generateToken({ uid , name});

        res.json({
            ok : true , 
            mssg : 'Renew token',
            uid,
            name,
            token
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}


module.exports = {
    newUser,
    login,
    renewToken,
}