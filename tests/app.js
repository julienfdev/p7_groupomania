const express = require('express');
const app = express();
const sequelize = require('./modules/Sequelize')
const User = require('./models/testModel');
const Race = require('./models/Race');

const bodyParser = require('body-parser');
const path = require('path');
const {
    userInfo
} = require('os');

const apiVersion = '/v1';

// Sequelize
const search = 'Babtou';

// Test sequelize
sequelize.authenticate()
    .then(() => {
        console.log('connexion OK');
        Race.sync().then(() => {
                User.sync().then(() => {
                    //  Race.create({nom: search});
                    Race.findOne({
                            where: {
                                nom: search
                            }
                        })
                        .then(object => {
                            object.getUsers().then(users =>{
                                for(user of users){
                                    console.log(user.toJSON());
                                }
                            });
                           // object.findUser().then(users => (console.log(users)))
                        })
/*                     Race.findOne({
                            where: {
                                nom: search
                            }
                        })
                        .then(object => {
                            if (!object) {
                                Race.create({
                                    nom: search
                                });
                            }
                            User.create({
                                firstName: 'Hakim',
                                lastName: 'Lolilol',
                                fk_race_id: object.dataValues.id
                            });
                        })
 */
                })
            })
            .catch(err => console.log(err));
    });

// Setting Headers for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parsing body to json for simple requests
app.use(bodyParser.json({
    limit: '10kb'
}));
// Serving public statically (Nginx ?)
app.use('/public', express.static(path.join(__dirname, 'public')));

//Routes


//404 Route
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Bad API Request'
    })
});
module.exports = app;