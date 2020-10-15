const express = require('express');
const app = express();
const config = require('./config/config');

const sequelize = require('./modules/sequelize');
const sqlFunctions = require('./modules/sqlFunctions')
const bodyParser = require('body-parser');
const path = require('path');
const htmlSanitizer = require('./middlewares/html-sanitizer');
const errorHandlers = require('./modules/errorHandlers')

//Constants
const apiVersion = 'v1';

//Routers
const userRouter = require('./routes/User');
const postRouter = require('./routes/Post');
const commentRouter = require('./routes/Comment');

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
//Sanitizing HTML, not useful with VueJS
//app.use(htmlSanitizer);



//Routes
app.use(`/api/${apiVersion}/user`, userRouter);
app.use(`/api/${apiVersion}/post`, postRouter);
app.use(`/api/${apiVersion}/comments`, commentRouter)

app.use('/public', express.static(__dirname + '/public'))

// Default error handling (for third-party middlewares)
app.use( (err, req, res, next) => {
    console.error(err)
    if(req.file){
        // If a file has been uploaded, we delete it
        errorHandlers.multerUndo(req);
    }
    if(err.code){
        // If it's a multer error (eg max filesize)
        res.status(500).json({error: err.code})
    }
    else{
        res.status(500).json({error: err.message})
    }
  })

module.exports = app;