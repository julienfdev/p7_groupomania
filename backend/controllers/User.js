const config = require('../config/config');

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');

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

exports.getUser = (req, res, next) => {
    res.status(200).json({
        message: `user recup : ${req.params.slug}`,
        admin: req.loggedUser.isAdmin,
        loggedslug : req.loggedUser.slug
    });
};