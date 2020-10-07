const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../modules/Sequelize');

const Race = sequelize.define('Race', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
/*     id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, */
},{
    
});

module.exports = Race;