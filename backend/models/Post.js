const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../modules/Sequelize');

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
    onDelete: 'CASCADE'
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
    onDelete: 'CASCADE'
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