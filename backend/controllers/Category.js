const Category = require('../models/Category');

exports.getCategories = async (req, res, next) => {
    const categories = await Category.findAll({
        attributes: ['slug', 'name', 'description']
    });
    res.status(200).send(categories);
};