const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/sequelize');



const Comments = sequelize.define('Comments', {
    slug: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            min: 15,
            max: 15,
        }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            min: 3,
            max: 500
        }
    }
}, {

})

module.exports = Comments;