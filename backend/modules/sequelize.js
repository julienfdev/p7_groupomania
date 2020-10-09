const config = require('../config/config').sqlConfig;
const { Sequelize } = require('sequelize');

// New Sequelize instance, using config.js object
const sequelize = new Sequelize(config.sqlDatabase, config.sqlLogin, config.sqlPass, {
    host: config.sqlHost,
    dialect: config.sqlType
  });

module.exports = sequelize;