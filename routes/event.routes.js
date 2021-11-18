/*
    PATH = HOST + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const validateToken = require('../middlewares/validateToken');
const validateFields = require('../middlewares/validateFields');

const { 
    getEvents, 
    updateEvent, 
    createEvent, 
    deleteEvent 
} = require('../controllers/event.controller');

const { isDate , isDateEnd } = require('../helpers/isDate');

const router = Router();

//Todas las peticiones usan ese middleware , entonces
router.use(validateToken);


//TODO: todas deben estar validadas
router
    .get('/' , getEvents)
    .post('/', [
        check('title','Title is mandatory').not().isEmpty(),
        check('start').custom(isDate),
        check('end').custom(isDate),
        check('end').custom(isDateEnd),
        validateFields
     ] ,createEvent)
    .put('/:id' , [
        check('id','That is not a valid MongoId').isMongoId()
    ] ,updateEvent)
    .delete('/:id', [
        check('id','That is not a valid MongoId').isMongoId()  
    ] , deleteEvent)


module.exports = router;