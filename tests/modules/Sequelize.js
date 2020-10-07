const {
    Sequelize
} = require('sequelize');

const sequelize = new Sequelize('testSequelize', 'julien', 'julien1337', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;