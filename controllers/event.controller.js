const { response } = require('express');

const Event = require('../models/event.model');

const createEvent = async ( req , res=response) => {
    try{
        
        const { user , ...rest } = req.body;

        rest.user = req.user;
        const event = new Event(rest);

        await event.save();

        res.json({
            ok : true,
            mssg : 'Create event',
            event
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}

const getEvents = async ( req , res=response) => {
    try{

        const { skip=0  , limit = 10} = req.query;
        const query = { user : req.user};
        const [ total , events ] = await Promise.all([
            Event.find(query).countDocuments(),
            Event.find(query)
                .populate('user','name')
                .skip(Number(skip))
                .limit(Number(limit))
        ]) 

        res.json({
            ok : true,
            total,
            events
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}

const updateEvent = async ( req , res=response) => {
    try{
        const { id } = req.params;
        const event = await Event.findById(id);
        
        if(!event) return res.status(404).json({ok : false , mssg : 'Event doesnt exist'})
        
        const newEvent = {
            ...req.body,
            user : req.user
        }
        if(event.user.toString() !== req.user){
            return res.status(401).json({ok : false , mssg : 'Not authorized to edit this event'})
        }

        const updatedEvent = await Event.findByIdAndUpdate(id , newEvent , { new : true });

        res.json({
            ok : true,
            updatedEvent
        })


    }catch(err){
        console.log(err);
        res.status(500).json({
            ok : false,
            mssg : err.message
        })
    }
}
const deleteEvent = async( req , res=response) => {
    try{

        const { id } = req.params;
        const event = await Event.findById(id);
        
        if(!event) return res.status(404).json({ok : false , mssg : 'Event doesnt exist'})
        
        if(event.user.toString() !== req.user){
            return res.status(401).json({ok : false , mssg : 'Not authorized to delet this event'})
        }

        await Event.findByIdAndDelete(id);

        res.json({
            ok : true,
            deleted : event
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