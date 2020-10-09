const User = require('../models/User');
const Category = require('../models/Category');
const Post = require('../models/Post');
const slugGenerator = require('../modules/slugGenerator');
const errorHandlers = require('../modules/errorHandlers');
const permissions = require('../modules/userPermissions');


exports.postComment = async (req, res, next) => {
    // Validators etc qui valident l'existence d'une catégorie etc
    // (req.validated)
    // We try to find the id of the poster
    try {
        const poster = await User.findOne({
            attributes: ['id'],
            where: {
                slug: req.loggedUser.slug
            }
        })
        if (!poster) {
            throw {
                status: 404,
                message: 'User not found'
            };
        }
        // If Found, we get the category instance (each post has ONE category)
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
            // POUR L'INSTANT ON FAIT UN FAKE APRES ON RAJOUTERA MULTER
            image_url: 'http://placehold.it/300x200',
            title: req.body.title,
            user_id: poster.id
        }
        console.log(postObject);
        // Once created, we add it to the Category:
        await category.createPost(postObject);

        res.status(201).json({message: 'Post added successfully'});
    } catch (error) {
        if (error.status) {
            errorHandlers.customErrorHandler(res, error);
        } else {
            errorHandlers.genericErrorHandler(res, error);
        }
    }
}