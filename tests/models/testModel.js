const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/Sequelize');
const Race = require('./Race');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //  id:{
    //   type: DataTypes.INTEGER,
    //    primaryKey: true,
    //     autoIncrement: true
    //  },
    uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    }
}, {

});

Race.hasMany(User, {
    foreignKey: {
        name: 'fk_race_id',
        allowNull: false,
    },
    onDelete: 'cascade'}); 

User.belongsTo(Race, {
    foreignKey: {
        name: 'fk_race_id',
        allowNull: false,
    },
    onDelete: 'cascade'});

module.exports = User;