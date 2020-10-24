const {
    formatComments
} = require('../modules/formattingFunctions');
const errorHandlers = require('../modules/errorHandlers')
const Comment = require('../models/Comment');
const permissions = require('../modules/userPermissions');
const slugGenerator = require('../modules/slugGenerator');

exports.adminGetLastComments = async (req, res, next) => {
    try {
        if (!req.loggedUser.isAdmin) {
            throw {
                status: 403,
                message: 'You are not an admin'
            };
        }
        // Get last 50 Comments
        const rawComments = await Comment.findAll({
            limit: 50,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        // Async function because it fetches Post information
        const comments = await formatComments(rawComments);
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        errorHandlers.basicHandler(res, error);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({
            where: {
                slug: req.params.slug
            }
        })
        if (!comment) {
            throw {
                status: 404,
                message: 'Comment not found'
            };
        }
        const posterId = (await comment.getUser({attributes: ['id']})).id;
        // lazy loading
        if (!((posterId === req.loggedUser.id ) || (req.loggedUser.isAdmin))) {
            throw {
                status: 403,
                message: 'Unauthorized update'
            }
        }
        await comment.update({
            text: req.validated.text,
            slug: slugGenerator(req.validated.text)
        })
        res.status(200).json({message: 'Comment updated successfully', commentSlug: comment.slug}, );
    } catch (error) {
        console.log(error);
        errorHandlers.basicHandler(res, error);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({
            where: {
                slug: req.params.slug
            }
        })
        if (!comment) {
            throw {
                status: 404,
                message: 'Comment not found'
            };
        }
        const commentPosterId = (await comment.getUser({attributes: ['id']})).id;
        if (!(commentPosterId === req.loggedUser.id) && !req.loggedUser.isAdmin) {
            throw {
                status: 403,
                message: 'Unauthorized deletion'
            }
        }
        await comment.destroy();
        res.status(200).json({message: 'Comment deleted successfully'});
    } catch (error) {
        console.log(error);
        errorHandlers.basicHandler(res, error);
    }
};