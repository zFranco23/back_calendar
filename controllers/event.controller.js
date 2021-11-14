const { response } = require('express');

const createEvent = ( req , res=response) => {
    try{

        res.json({
            ok : true,
            mssg : 'Create event'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}

const getEvents = ( req , res=response) => {
    try{

        res.json({
            ok : true,
            mssg : 'Get events'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}

const updateEvent = ( req , res=response) => {
    try{

        res.json({
            ok : true,
            mssg : 'Update event'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}
const deleteEvent = ( req , res=response) => {
    try{

        res.json({
            ok : true,
            mssg : 'Delete event'
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
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}