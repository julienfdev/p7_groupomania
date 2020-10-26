const config = require('../config/config');

const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');
const permissions = require('../modules/userPermissions');
const {
    formatPosts,
    formatPost,
    formatComments,
    formatComment
} = require('../modules/formattingFunctions');
const Category = require('../models/Category');

exports.signup = async (req, res, next) => {
    //Validators (req.validated.xxx) (en MIDDLEWARE avec argument selon scope!!)
    try {
        // First thing is to hash the password using bcrypt
        const hash = await bcrypt.hash(req.validated.password, 10);
        // Generating the unique slug
        const slug = slugGenerator(req.validated.nickname);
        // Object construct using the build method
        const userSignup = User.build({
            email: req.validated.email,
            nickname: req.validated.nickname,
            password: hash,
            slug: slug
        });
        // Saving object into DB (can throw errors handled by sqlErrorHandler)
        await userSignup.save();
        res.status(201).json({
            message: 'User successfully created'
        });
    } catch (error) {
        errorHandlers.basicHandler(res, error);
    }
}

exports.login = async (req, res, next) => {
    //Validators (req.validated.xxx) (en MIDDLEWARE avec argument selon scope!!)
    try {
        // login provides email and password, we try to find the user using the email, and fetch email password and slug column
        // findOne returns the instance in db
        const userFound = await User.findOne({
            attributes: ['email', 'password', 'slug', 'isAdmin'],
            where: {
                email: req.validated.email
            }
        })
        // If not found, this user doesn't exist
        if (userFound === null) {
            throw {
                message: 'User does not exists',
                status: 404
            }
        } else {
            // If the user exists, comparing the password to the hash in the userFound instance (password column)
            // bcrypt.compare returns a bool
            const passValid = await bcrypt.compare(req.validated.password, userFound.password);
            if (!passValid) {
                throw {
                    message: 'Wrong password',
                    status: 401
                }
            }
            // If user/pass are valid, we encode the userSlug into a token and send the token and the slug to the user
            // The frontend now has the token to build the Authorization header and the userSlug to provide to each authenticated request
            const token = await jwt.sign({
                    userSlug: userFound.slug
                },
                config.jwtConfig.secret, {
                    expiresIn: config.jwtConfig.expiration
                })
            res.status(200).json({
                token: token,
                slug: userFound.slug,
                isAdmin: userFound.isAdmin,
                expires: (Math.floor(Date.now() / 1000) + config.jwtConfig.expiration)
            })
        }
    } catch (error) {
        errorHandlers.basicHandler(res, error);
    }
};

exports.getUser = async (req, res, next) => {
    //Validator middleware etc...
    try {
        const attributes =
            // Depending if a random user is fetching another one or if it's the same user/admin
            // fetched columns are not the same 
            permissions.isSelfOrAdmin(req.loggedUser, req.params.slug) ? ['slug', 'email', 'nickname', 'createdAt'] : ['slug', 'nickname', 'createdAt'];
        // We try to find the slug passed in params (/:slug route)
        const user = await User.findOne({
            where: {
                slug: req.params.slug
            },
            attributes: attributes
        });
        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            }
        }
        res.status(200).json({
            // toJSON method delete all the "sequelize attributes"
            user: user.toJSON()
        });

    } catch (error) {
        errorHandlers.basicHandler(res, error);
    }
};

exports.updateUser = async (req, res, next) => {
    //Validator middleware etc...
    // Fonction de nettoyage requete

    try {
        // update user can modify the slug, so we need to send another token to the user if it's his profile
        let token = null;
        // If it's not an admin or not the user which try to modify the profile, throw error
        if (!permissions.isSelfOrAdmin(req.loggedUser, req.params.slug)) {
            throw {
                status: 403,
                message: 'Unauthorized Update'
            }
        }
        // If password has been changed, rehash
        if (req.validated.password) {
            req.validated.password = await bcrypt.hash(req.validated.password, 10);
        }
        // If nickname has been changed we need to update the slug, and if it's not the admin, we need to provide a new token/slug to the user
        if (req.validated.nickname) {
            req.validated.slug = slugGenerator(req.validated.nickname)
            if (permissions.isSelf(req.loggedUser, req.params.slug)) {
                token = jwt.sign({
                        userSlug: req.validated.slug
                    },
                    config.jwtConfig.secret, {
                        expiresIn: config.jwtConfig.expiration
                    })
            }
        }
        // We update the db object spreading the body of the request (to be changed to req.validated)
        const userUpdated = await User.update({
            ...req.validated
        }, {
            where: {
                slug: req.params.slug
            }
        });
        // If nothing has changed
        if (!userUpdated) {
            throw {
                status: 304,
                message: 'User not updated'
            };
        }
        res.status(200).json({
            token: token,
            userSlug: req.validated.slug,
            message: 'User updated successfully'
        });
    } catch (error) {
        errorHandlers.basicHandler(res, error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        // same than updateUser
        if (!permissions.isSelfOrAdmin(req.loggedUser, req.params.slug)) {
            throw {
                status: 403,
                message: 'Unauthorized Deletion'
            }
        }
        // If the user is trying to delete his account, he needs to provide his password
        if (permissions.isSelf(req.loggedUser, req.params.slug)) {
            if (!req.validated.password) {
                throw {
                    status: 401,
                    message: 'Password validation missing'
                };
            }
            // Password is compared to hash in db (fetching password column)
            const userMatch = await User.findOne({
                attributes: ['password'],
                where: {
                    slug: req.loggedUser.slug
                }
            });
            if (!userMatch) {
                throw {
                    status: 404,
                    message: 'User not valid anymore'
                };
            }
            if (!(await bcrypt.compare(req.validated.password, userMatch.password))) {
                throw {
                    status: 401,
                    message: 'Invalid password'
                };
            }
        }
        // User deletion
        const deleted = User.destroy({
            where: {
                slug: req.params.slug
            }
        })
        if (!deleted) {
            throw {
                status: 304,
                message: 'User not deleted'
            };
        }
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        errorHandlers.basicHandler(res, error);
    }
};

exports.getUserPosts = async (req, res, next) => {
    // Search user from slug params, then fetch his posts
    try {
        const user = await User.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            };
        }
        // Get all user posts    
        const rawPosts = await user.getPosts({
            order: [
                ['createdAt', 'DESC']
            ],
            include: {
                model: Category,
                required: true
            }
        });
        console.log(rawPosts);
        const posts = await formatPosts(rawPosts, req.loggedUser);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        errorHandlers.basicHandler(res, error);
    }
};

exports.getUserLikedPosts = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            };
        }
        const rawLikes = await user.getLikes({
            where: {
                like_status: 1
            },
        });
        let likedPosts = [];
        for (like of rawLikes) {
            const likedPost = await like.getPost({
                include: Category
            });
            likedPosts.unshift(formatPost(likedPost));
        }
        res.status(200).json(likedPosts);
    } catch (error) {
        console.log(error);
        errorHandlers.basicHandler(res, error);
    }
};

exports.getUserComments = async (req, res, next) => {
    try {
        if (!permissions.isSelfOrAdmin(req.loggedUser, req.params.slug)) {
            throw {
                status: 403,
                message: 'You are not authorized to get the user comments'
            };
        }
        const user = await User.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            };
        }
        const rawComments = await user.getComments({
            limit: 50,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        // Limit
        let comments = await formatComments(rawComments);
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        errorHandlers.basicHandler(res, error);
    }
}

exports.adminGetLastUsers = async (req, res, next) => {
    try {
        if (!req.loggedUser.isAdmin) {
            throw {
                status: 403,
                message: 'You are not an admin'
            };
        }
        // Get last 50 Comments
        const lastUsers = await User.findAll({
            limit: 15,
            order: [
                ['createdAt', 'DESC']
            ],
            attributes: ['nickname', 'slug', 'email']
        });
        // Async function because it fetches Post information
        res.status(200).json(lastUsers);
    } catch (error) {
        console.log(error);
        errorHandlers.basicHandler(res, error);
    }
};