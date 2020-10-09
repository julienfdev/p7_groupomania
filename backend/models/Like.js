const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/sequelize');

const Like = sequelize.define('Like', {
    like_status: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
        validate: {
           min: -1,
           max: 1
        }
    }
}, {

});

module.exports = Like;