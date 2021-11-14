/*
    Rutas de auth : HOST + /api/auth    
*/
const { Router } = require('express');
const { check } = require('express-validator'); 

const { existsUser } = require('../middlewares/customs');
const validateFields = require('../middlewares/validateFields');
const validateToken = require('../middlewares/validateToken');

const { newUser, renewToken, login } = require('../controllers/auth.controller');

const router = Router();


router
    .post('/new', [
        check('name','Name is mandatory').not().isEmpty(),
        check('email').custom(existsUser),
        check('email','Incorrect email').isEmail(),
        check('password','Password must be at least 6 characters').isLength({ min : 6}),
        validateFields
    ] ,newUser)

    .post('/', [
        check('email','Incorrect email').isEmail(),
        check('password','Password must be at least 6 characters').isLength({ min : 6}),
        validateFields
    ], login)

    .get('/renew',validateToken, renewToken)

module.exports = router;