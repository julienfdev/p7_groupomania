const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');
const permissions = require('../modules/userPermissions');
const fs = require('fs');
const {
    formatPost
} = require('../modules/formattingFunctions');

exports.postPost = async (req, res, next) => {
    // Validators etc qui valident l'existence d'une catégorie etc
    // (req.validated)
    //We get the category instance (each post has ONE category)
    try {
        const category = await Category.findOne({
            where: {
                slug: req.body.categorySlug
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
            slug: slugGenerator(req.body.title),
            image_url: `${req.protocol}://${req.get('host')}/${req.file.path}`,
            title: req.body.title,
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

exports.postLike = async (req, res, next) => { // Il faudra des transactions ici
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
            include: {
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
        // RAJOUTER FONCTION DE FORMATAGE DES COMMENTS UNE FOIS IMPLEMENTE
        const commentList = await post.getComments();

        res.status(200).json({
            post: postObject,
            commentList
        });

    } catch (error) {
        console.error(error.message);
        errorHandlers.basicHandler(res, error);
    }
};

exports.updatePost = async (req, res, next) => {
    // Get the post to be modified and get User to compare with the loggedUser
    // RAJOUTER VALIDATION REQ.VALIDATED ETC
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
        let imageUrl = post.image_url;
        if(req.file){
            unlinker(imageUrl);
            imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
        }
        const postUpdate = {
            ...req.body,
            slug: slugGenerator(req.body.title),
            image_url: imageUrl, // FAIRE LA PASSERELLE AVEC MULTER
            is_hot: (req.loggedUser.isAdmin ? req.body.is_hot : post.is_hot)
        }
        await post.update(postUpdate);
        res.status(200).json({
            postSlug: post.slug,
            message: 'Successfully updated post'
        });
    } catch (error) {
        errorHandlers.multerUndo(req);
        errorHandlers.basicHandler(res, error);
    }

    // Gestion modif fichier + fs pour suppr l'ancien etc
    // Ce qu'on peut faire avec Multer c'est passer un middleware après coup pour refaire un body "standard"
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
    const postAlreadyLiked = await post.getLikes({
        where: {
            user_id: req.loggedUser.id
        }
    })
    if (!postAlreadyLiked[0]) {
        if (req.body.like_status === 0) {
            throw {
                status: 400,
                message: 'Invalid Like Request'
            };
        }
        await post.createLike({
            like_status: req.body.like_status,
            user_id: req.loggedUser.id
        });
        await post.update({
            likes: post.likes += req.body.like_status
        });
        res.status(200).json({
            message: 'like Status updated'
        });
    } else if (req.body.like_status !== 0) {
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

const unlinker = (filepath) => {
    const formattedPath = `./public/images/${filepath.split('/public/images/')[1]}`;
    fs.unlink(formattedPath, ()=>{
        console.log('unlinked');
    });
}