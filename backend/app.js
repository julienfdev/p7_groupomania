const express = require('express');
const app = express();
const config = require('./config/config');

const sequelize = require('./modules/Sequelize');
const sqlFunctions = require('./modules/SqlFunctions')
const bodyParser = require('body-parser');
const path = require('path');

const User = require('./models/User');

const htmlSanitizer = require('./middlewares/html-sanitizer');

//SQL Connection
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
// Sanitizing SQL ?

//Sanitizing HTML
app.use(htmlSanitizer);




app.use('/', (req, res, next) => {
    res.status(200).json({message: 'WIP'});
});

module.exports = app;