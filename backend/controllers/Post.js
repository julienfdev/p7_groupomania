const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');
const permissions = require('../modules/userPermissions');
const fs = require('fs');
const {
    formatPost,
    formatPosts,
    formatComments
} = require('../modules/formattingFunctions');


/* Post object : 
Multipart: 
image : 1MB max png/jpg/jpeg
post: an object with the following fields
{
    title: String,
    categorySlug: String
}
*/
exports.postPost = async (req, res, next) => {
    //We get the category instance (each post has ONE category)
    try {
        const category = await Category.findOne({
            where: {
                slug: req.validated.categorySlug
            }
        })
        if (!category) {
            throw {
                status: 404,
                message: 'Category not found'
            };
        }
        // If all is well, we can proceed by creating the post object
        const postObject = {
            slug: slugGenerator(req.validated.title),
            image_url: `${req.protocol}://${req.get('host')}/${req.file.path}`,
            title: req.validated.title,
            user_id: req.loggedUser.id
        }
        console.log(postObject);
        // Once created, we add it to the Category:
        await category.createPost(postObject);

        res.status(201).json({
            message: 'Post added successfully'
        });
    } catch (error) {
        console.log(error);
        errorHandlers.multerUndo(req);
        errorHandlers.basicHandler(res, error);
    }
};

exports.postLike = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!post) {
            throw {
                status: 404,
                message: 'Post not found'
            };
        }
        return await likeLogicHandler(req, res, post);
    } catch (error) {
        errorHandlers.basicHandler(res, error);
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            },
            include: { // INNER JOIN
                model: Category,
                required: true
            }
        });
        if (!post) {
            throw {
                status: 404,
                message: 'Post not found'
            };
        }
        const postObject = formatPost(post);
        const rawComments = await post.getComments();
        const commentList = await formatComments(rawComments);

        res.status(200).json({
            post: postObject,
            commentList
        });

    } catch (error) {
        console.error(error);
        errorHandlers.basicHandler(res, error);
    }
};

/* Post object : 
Multipart OR json only: 
[image : 1MB max png/jpg/jpeg]
post: an object with the following fields
{
    title: String,
    [is_hot] (only if Admin)
}
*/
exports.updatePost = async (req, res, next) => {
    // Get the post to be modified and get User to compare with the loggedUser
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!post) {
            throw {
                status: 404,
                message: 'Post not found'
            };
        }
        // If post not modified by admin or user itself
        if (!(req.loggedUser.isAdmin || req.loggedUser.id === post.user_id)) {
            throw {
                status: 403,
                message: 'Unauthorized tampering attempt'
            };
        }
        let imageUrl = post.image_url;
        // If there is a file (image change), delete old one and parse new url
        if (req.file) {
            unlinker(imageUrl);
            imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        }
        const postUpdate = {
            ...req.validated,
            slug: (req.validated.title) ? slugGenerator(req.validated.title) : post.slug,
            image_url: imageUrl,
            // If user is admin and is_hot updated, new is_hot, else, old one 
            is_hot: (req.loggedUser.isAdmin && (req.validated.is_hot !== null && req.validated.is_hot !== undefined) ? req.validated.is_hot : post.is_hot) // If user is admin and isHot updated, new is hot, else, old one 
        }
        await post.update(postUpdate);
        res.status(200).json({
            // providing the new slug to the frontend to push to the router
            postSlug: post.slug,
            message: 'Successfully updated post'
        });
    } catch (error) {
        console.error(error);
        // If there's an error of any kind, we delete the updated file
        errorHandlers.multerUndo(req);
        errorHandlers.basicHandler(res, error);
    }
};


exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!post) {
            throw {
                status: 404,
                message: 'Post not found'
            };
        }
        if (!(req.loggedUser.isAdmin || req.loggedUser.id === post.user_id)) {
            throw {
                status: 403,
                message: 'Unauthorized tampering attempt'
            };
        }
        const filepath = post.image_url;
        await post.destroy();
        unlinker(filepath);
        res.status(200).json({
            message: 'Successfully deleted post'
        });
    } catch (error) {
        console.error(error.message);
        errorHandlers.basicHandler(res, error);
    }
};


const likeLogicHandler = async (req, res, post) => {
    // We check if user has already liked (or disliked) the post
    const postAlreadyLiked = await post.getLikes({
        where: {
            user_id: req.loggedUser.id
        }
    })
    // If we don't found the user, then the like status provided can't be 0
    if (!postAlreadyLiked[0]) {
        if (req.validated.like_status === 0) {
            throw {
                status: 400,
                message: 'Invalid Like Request'
            };
        }
        await post.createLike({
            like_status: req.validated.like_status,
            user_id: req.loggedUser.id
        });
        await post.update({
            likes: post.likes += req.validated.like_status
        });
        res.status(200).json({
            message: 'like Status updated'
        });
        // If user already liked or disliked, it can only be a "back to neutral request", if it's not : error
    } else if (req.validated.like_status !== 0) {
        throw {
            status: 400,
            message: 'Invalid Like Request'
        };
    } else {
        await post.update({
            likes: post.likes -= postAlreadyLiked[0].like_status
        })
        await postAlreadyLiked[0].destroy();
        res.status(200).json({
            message: 'like Status updated'
        });
    }
};

exports.getPage = async (req, res, next, hotPage) => {
    try {
        const postPerPage = 25;
        let offset = 0;
        if (req.params.page) {
            if (!(Number(req.params.page) === NaN)) {
                offset = (Number(req.params.page) > 1) ? postPerPage * Number(req.params.page - 1) : 0;
            }
        }
        const rawHotPostArray = await Post.findAll({
            where: {
                is_hot: hotPage
            },
            limit: postPerPage,
            offset,
            include: {
                model: Category,
                required: true
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if (rawHotPostArray.length) {
            res.status(200).json(formatPosts(rawHotPostArray));
        } else {
            res.status(204).json();
        }
    } catch (error) {
        console.error(error.message);
        errorHandlers.basicHandler(res, error);
    }

};

exports.getCategoryPosts = async (req, res, next) => {
    try {
        const postPerPage = 25;
        let offset = 0;
        if (req.params.page) {
            if (!(Number(req.params.page) === NaN)) {
                offset = (Number(req.params.page) > 1) ? postPerPage * Number(req.params.page - 1) : 0;
            }
        }
        const category = await Category.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (!category) {
            throw {
                status: 404,
                message: 'Category not found'
            };
        }
        const rawPostArray = await category.getPosts({
            include: {
                model: Category,
                required: true
            },
            limit: postPerPage,
            offset,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        if (rawPostArray.length) {
            res.status(200).json(formatPosts(rawPostArray));
        } else {
            res.status(204).json();
        }
    } catch (error) {
        console.error(error.message);
        errorHandlers.basicHandler(res, error);
    }
};

/* Comment : {
    text : String(500),
    user_id : Number
}
*/
exports.postComment = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                slug: req.params.slug
            },
        });
        if (!post) {
            throw {
                status: 404,
                message: 'Post not found'
            };
        }
        const comment = {
            text: req.validated.text,
            slug: slugGenerator(req.validated.text),
            user_id: req.loggedUser.id
        }
        await post.createComment(comment)

        res.status(201).json({commentSlug: comment.slug});

    } catch (error) {
        console.error(error.message);
        errorHandlers.basicHandler(res, error);
    }
};

const unlinker = (filepath) => {
    const formattedPath = `./public/images/${filepath.split('/public/images/')[1]}`;
    fs.unlink(formattedPath, () => {
        console.log('unlinked');
    });
}