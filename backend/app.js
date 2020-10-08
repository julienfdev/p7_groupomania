const express = require('express');
const app = express();
const config = require('./config/config');

const sequelize = require('./modules/Sequelize');
const sqlFunctions = require('./modules/SqlFunctions')
const bodyParser = require('body-parser');
const path = require('path');
const htmlSanitizer = require('./middlewares/html-sanitizer');

//Constants
const apiVersion = 'v1';

//Routers
const userRouter = require('./routes/User');

//SQL Connection and sync
sqlFunctions.sqlInit();
sqlFunctions.sqlSync();

// Setting Headers for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parsing body to json for simple requests
app.use(bodyParser.json());
//Sanitizing HTML
app.use(htmlSanitizer);



//Routes
app.use(`/api/${apiVersion}/user`, userRouter);

app.use('/', (req, res, next) => {
    res.status(200).json({message: 'WIP'});
});

module.exports = app;