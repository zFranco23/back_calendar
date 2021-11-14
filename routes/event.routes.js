/*
    PATH = HOST + /api/events
*/

const { Router } = require('express');


const validateToken = require('../middlewares/validateToken');

const { 
    getEvents, 
    updateEvent, 
    createEvent, 
    deleteEvent 
} = require('../controllers/event.controller');

const router = Router();



//TODO: todas deben estar validadas
router
    .get('/' , validateToken , getEvents)
    .post('/' , validateToken , createEvent)
    .put('/:id' , validateToken , updateEvent)
    .delete('/:id' , validateToken , deleteEvent)


module.exports = router;