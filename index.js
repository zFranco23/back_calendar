require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectionDB = require('./database/db.config');
//Rutas
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

const app = express();
connectionDB();

//Public
app.use(morgan('dev'))
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

//RUTAS
// TODO: auth  : crear ,login, renew
app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
// TODO: crud eventos

app.listen( process.env.PORT , () => {
    console.log(`Servidor escuchando en ${process.env.PORT}`)
})