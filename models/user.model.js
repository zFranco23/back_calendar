const { Schema , model } = require('mongoose');

const UserSchema = new Schema({
    name : { type : String , required : [ true , 'Name is mandatory']},
    email : {
        type : String,
        required : [ true , 'Email is mandatory'],
        unique : true
    } ,
    password : { type : String , required : [true , 'Password is mandatory']}
},{
    versionKey : false
})


module.exports = model('User' , UserSchema );