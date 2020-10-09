const config = require('../config/config');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');
const permissions = require('../modules/userPermissions')

exports.signup = async (req, res, next) => {
    //Validators (req.validated.xxx) (en MIDDLEWARE avec argument selon scope!!)
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const slug = slugGenerator(req.body.nickname);
        const userSignup = User.build({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hash,
            slug: slug
        });
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
        const userFound = await User.findOne({
            attributes: ['email', 'password', 'slug'],
            where: {
                email: req.body.email
            }
        })
        if (userFound === null) {
            throw {
                message: 'User does not exists',
                status: 404
            }
        } else {
            const passValid = await bcrypt.compare(req.body.password, userFound.password);
            if (!passValid) {
                throw {
                    message: 'Wrong password',
                    status: 401
                }
            } else {
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
            permissions.isSelfOrAdmin(req.loggedUser, req.params.slug) ? ['slug', 'email', 'nickname', 'createdAt'] : ['slug', 'nickname', 'createdAt'];
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
            user
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
        let token = null;
        delete req.body.userSlug;
        if (!permissions.isSelfOrAdmin(req.loggedUser, req.params.slug)) {
            throw {
                status: 403,
                message: 'Unauthorized Update'
            }
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
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
        const userUpdated = await User.update({
            ...req.body
        }, {
            where: {
                slug: req.params.slug
            }
        });
        if (!userUpdated) {
            throw {
                status: 304,
                message: 'User not updated'
            };
        }
        res.status(200).json({
            token: token,
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
        if (!permissions.isSelfOrAdmin(req.loggedUser, req.params.slug)) {
            throw {
                status: 403,
                message: 'Unauthorized Deletion'
            }
        }
        if (permissions.isSelf(req.loggedUser, req.params.slug)) {
            if (!req.body.password) {
                throw {
                    status: 401,
                    message: 'Password validation missing'
                };
            }
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
        const deleted = User.destroy({
            where:{
                slug: req.params.slug
            }
        })
        if(!deleted){
            throw {status: 304, message: 'User not deleted'};
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