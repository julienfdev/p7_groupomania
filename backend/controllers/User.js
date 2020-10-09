const config = require('../config/config');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');
const permissions = require('../modules/userPermissions');

exports.signup = async (req, res, next) => {
    //Validators (req.validated.xxx) (en MIDDLEWARE avec argument selon scope!!)
    try {
        // First thing is to hash the password using bcrypt
        const hash = await bcrypt.hash(req.body.password, 10);
        // Generating the unique slug
        const slug = slugGenerator(req.body.nickname);
        // Object construct using the build method
        const userSignup = User.build({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hash,
            slug: slug
        });
        // Saving object into DB (can throw errors handled by sqlErrorHandler)
        await userSignup.save();
        res.status(201).json({
            message: 'User successfully created'
        });
    } catch (err) {
        console.log(err);
        if (err.errors) {
            errorHandlers.sqlErrorHandler(res, err.errors);
        } else {
            errorHandlers.genericErrorHandler(res, err);
        }
    }
}

exports.login = async (req, res, next) => {
    //Validators (req.validated.xxx) (en MIDDLEWARE avec argument selon scope!!)
    try {
        // login provides email and password, we try to find the user using the email, and fetch email password and slug column
        // findOne returns the instance in db
        const userFound = await User.findOne({
            attributes: ['email', 'password', 'slug'],
            where: {
                email: req.body.email
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
            const passValid = await bcrypt.compare(req.body.password, userFound.password);
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
                slug: userFound.slug
            })
        }
    } catch (error) {
        if (error.status) {
            errorHandlers.customErrorHandler(res, error);
        } else {
            errorHandlers.genericErrorHandler(res, error);
        }
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
        if (error.status) {
            errorHandlers.customErrorHandler(res, error);
        } else {
            errorHandlers.genericErrorHandler(res, error);
        }
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
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        // If nickname has been changed we need to update the slug, and if it's not the admin, we need to provide a new token/slug to the user
        if (req.body.nickname) {
            req.body.slug = slugGenerator(req.body.nickname)
            if (permissions.isSelf(req.loggedUser, req.params.slug)) {
                token = jwt.sign({
                        userSlug: req.body.slug
                    },
                    config.jwtConfig.secret, {
                        expiresIn: config.jwtConfig.expiration
                    })
            }
        }
        // We update the db object spreading the body of the request (to be changed to req.validated)
        const userUpdated = await User.update({
            ...req.body
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
            userSlug: req.body.slug,
            message: 'User updated successfully'
        });
    } catch (error) {
        if (error.status) {
            errorHandlers.customErrorHandler(res, error);
        } else if (error.errors) {
            errorHandlers.sqlErrorHandler(res, error.errors);
        } else {
            errorHandlers.genericErrorHandler(res, error);
        }
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
            if (!req.body.password) {
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
            if (!(await bcrypt.compare(req.body.password, userMatch.password))) {
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
        if (error.status) {
            errorHandlers.customErrorHandler(res, error);
        } else {
            errorHandlers.genericErrorHandler(res, error);
        }
    }
}