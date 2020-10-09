// ███████╗ ██████╗ ██╗         ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██╔═══██╗██║         ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ███████╗██║   ██║██║         █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ╚════██║██║▄▄ ██║██║         ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ███████║╚██████╔╝███████╗    ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚══════╝ ╚══▀▀═╝ ╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//                                                                                                        

const sequelize = require('./sequelize');

//Dependencies
const User = require('../models/User');
const Like = require('../models/Like');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Comment = require('../models/Comment');

//SQL Init : opening connection
exports.sqlInit = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Synchronises all models with databases, creating tables if not found
// See logging options for production
exports.sqlSync = async () => {
    try {
        Category.sync();
        User.sync();
        Post.sync();
        Comment.sync();
        Like.sync();
    } catch (error) {
        console.log(error);
    }
};