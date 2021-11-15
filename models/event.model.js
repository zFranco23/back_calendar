const { Schema , model } = require('mongoose');

const EventSchema = new Schema({

    title : { type : String , required : true},
    notes : { type : String },
    start : { type : Date, required : true},
    end : { type : Date , required : true},
    user : { type : Schema.Types.ObjectId, ref : 'User' , required : true}
},{
    versionKey : false
})


EventSchema.methods.toJSON = function(){
    const { _id , ...rest} = this.toObject();

    return {
        eid : _id,
        ...rest
    }
}


module.exports = model('Event' , EventSchema );