const config = require('../config/config');

const jwt = require('jsonwebtoken');
const errorHandlers = require('../modules/errorHandlers');

const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const providedSlug = req.body.userSlug;
        if (!token || !providedSlug) {
            throw {
                status: 400,
                message: 'Missing Auth data'
            }
        }
        let tokenValid;
        try {
            tokenValid = jwt.verify(token.split(' ')[1], config.jwtConfig.secret);
        } catch (error) {
            if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                throw {
                    status: 401,
                    message: error.name
                }
            } else {
                throw error
            }
        }
        if (!tokenValid) {
            throw {
                status: 500,
                message: 'Something went wrong'
            }
        }
        const userMatch = await User.findOne({
            attributes: [
                'slug', 'isAdmin'
            ],
            where: {
                slug: tokenValid.userSlug
            }
        });
        if (!userMatch) {
            throw {
                status: 404,
                message: 'User account isn\'t valid anymore'
            }
        }
        if (!(userMatch.slug === req.body.userSlug)) {
            throw {
                status: 403,
                message: 'Slug mismatch, possible forgery attempt'
            }
        }

        req.loggedUser = {};
        req.loggedUser.isAdmin = userMatch.isAdmin;
        req.loggedUser.slug = userMatch.slug;
        next();

    } catch (error) {
        if (error.status) {
            errorHandlers.customErrorHandler(res, error);
        } else {
            errorHandlers.genericErrorHandler(res, error);
        }
    }
    //next();
};

module.exports = authMiddleware;