const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/sequelize');

// Dependencies
const Comment = require('./Comment');
const Like = require('./Like');
const Post = require('./Post');

const User = sequelize.define('User', {
    slug: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            min: 15,
            max: 15,
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            min: 5,
            max: 100,
            isEmail: true
        }
    },
    nickname: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        validate: {
            min: 3,
            max: 40,
        }

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {

});

// Foreign Keys
User.hasMany(Comment, {
    foreignKey: {
        name: "user_id"
    }
});
Comment.belongsTo(User, {
    foreignKey: {
        name: "user_id"
    }
});

User.hasMany(Post, {
    foreignKey: {
        name: 'user_id'
    }
});
Post.belongsTo(User, {
        foreignKey: {
        name: "user_id"
    }
});

User.hasMany(Like, {
    foreignKey: {
        name: 'user_id'
    }
});
Like.belongsTo(User, {
    foreignKey: {
        name: "user_id"
    }
});

module.exports = User;