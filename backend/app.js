const express = require('express');
const app = express();
const config = require('./config/config');

const bodyParser = require('body-parser');
const path = require('path');

const htmlSanitizer = require('./middlewares/html-sanitizer');

//SQL Connection


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
    res.status(200).json({message: config.testKey});
});

module.exports = app;