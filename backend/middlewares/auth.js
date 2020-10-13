//  █████╗ ██╗   ██╗████████╗██╗  ██╗
// ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
// ███████║██║   ██║   ██║   ███████║
// ██╔══██║██║   ██║   ██║   ██╔══██║
// ██║  ██║╚██████╔╝   ██║   ██║  ██║
// ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
//                                   

const config = require('../config/config');

const jwt = require('jsonwebtoken');
const errorHandlers = require('../modules/errorHandlers');

const User = require('../models/User');

// The auth middleware is called in front of each authenticated request
// It handles errors and write the loggedUser into the request before calling next() if user is legit
const authMiddleware = async (req, res, next) => {
    try {
        // Each request body must include a "userSlug" - provided to the frontend after login, and a token
        const token = req.headers.authorization;
        const providedSlug = req.body.userSlug;
        // If token or slug not found, throw error
        if (!token || !providedSlug) {
            throw {
                status: 400,
                message: 'Missing Auth data'
            }
        }
        let tokenValid;
        // try-catch sub block to throw JWT error, self-explainatory
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
        // TokenValid is an object, if it's not found, something went wrong
        if (!tokenValid) {
            throw {
                status: 500,
                message: 'Something went wrong'
            }
        }
        // We search the database for a user matching the slug INSIDE THE TOKEN
        const userMatch = await User.findOne({
            attributes: [
                'slug', 'isAdmin', 'id'
            ],
            where: {
                slug: tokenValid.userSlug
            }
        });
        // If it doesn't exist, user have changed name/slug or is deleted
        if (!userMatch) {
            throw {
                status: 404,
                message: 'User account isn\'t valid anymore'
            }
        }
        // If the slug provided into the body mismatch the token, someone is trying to use his token with another userSlug
        if (!(userMatch.slug === req.body.userSlug)) {
            throw {
                status: 403,
                message: 'Slug mismatch, possible forgery attempt'
            }
        }

        // If token is valid, user still exists and is legit, we create an object into the request, with the loggedUser slug and the admin status bool 
        req.loggedUser = {};
        req.loggedUser.isAdmin = userMatch.isAdmin;
        req.loggedUser.slug = userMatch.slug;
        req.loggedUser.id = userMatch.id
        delete req.body.userSlug; // We don't need this field anymore, it's stored in loggedUser.slug
        next();
    } catch (error) {
        errorHandlers.multerUndo(req);           // Delete upload if request unauthorized
        errorHandlers.basicHandler(res, error);
    }
    //next();
};

module.exports = authMiddleware;