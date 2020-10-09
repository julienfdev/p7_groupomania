// See User model for comments about foreign keys

const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/sequelize');

// Dependencies
const Like = require('./Like');
const Comment = require('./Comment');
const Category = require('./Category');

const Post = sequelize.define('Post', {
    slug: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            min: 15,
            max: 15,
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            min: 5,
            max: 100
        }
    },
    is_hot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
            isBoolean: true
        }
    }
}, {

})

Post.hasMany(Like, {
    foreignKey: {
        name: 'post_id'
    },
    onDelete: 'CASCADE' // When a post is deleted, we delete the likes attached to it
})
Like.belongsTo(Post, {
    foreignKey: {
        name: 'post_id'
    },
    onDelete: 'CASCADE'
});


Post.hasMany(Comment, {
    foreignKey: {
        name: 'post_id',
        allowNull: false
    },
    onDelete: 'CASCADE' // When a post is deleted, we delete the comments attached to it
});
Comment.belongsTo(Post, {
    foreignKey: {
        name: 'post_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});


Category.hasMany(Post, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
})
Post.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    }
});

module.exports = Post;