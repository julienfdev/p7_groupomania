const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/Sequelize');

const Like = sequelize.define('Like', {
    like_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            isBoolean: true
        }
    }
}, {

});

module.exports = Like;