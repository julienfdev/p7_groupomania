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

// Foreign Key : Comments table has a foreign user_id key referencing user.id (duplicate required for sequelize functions like getComment() etc..)
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

// Foreign Key : Posts table has a foreign user_id key referencing user.id (duplicate required for sequelize functions like getPost() etc..)
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

// Foreign Key : Like table has a foreign user_id key referencing user.id (duplicate required for sequelize functions like getPost() etc..)
User.hasMany(Like, {
    foreignKey: {
        name: 'user_id'
    },
    onDelete: 'CASCADE'
});
Like.belongsTo(User, {
    foreignKey: {
        name: "user_id"
    }
});

module.exports = User;