const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/Sequelize');


const Category = sequelize.define('Category', {
    slug: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            min: 15,
            max: 15,
        }
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'Categories'
})

module.exports = Category;