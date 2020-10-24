// ██╗   ██╗ █████╗ ██╗     ██╗██████╗  █████╗ ████████╗ ██████╗ ██████╗ ███████╗
// ██║   ██║██╔══██╗██║     ██║██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
// ██║   ██║███████║██║     ██║██║  ██║███████║   ██║   ██║   ██║██████╔╝███████╗
// ╚██╗ ██╔╝██╔══██║██║     ██║██║  ██║██╔══██║   ██║   ██║   ██║██╔══██╗╚════██║
//  ╚████╔╝ ██║  ██║███████╗██║██████╔╝██║  ██║   ██║   ╚██████╔╝██║  ██║███████║
//   ╚═══╝  ╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
//                                                                               
// Used to validate requests and create a custom object for controllers to use depending on request (req.validated)
const errorHandlers = require('../modules/errorHandlers');
const validator = require('validator');

exports.comment = (req, res, next) => {
    try {
        let errorObject = {};
        if (!req.body.text) {
            errorObject.text = 'missing';
        } else if (req.body.text.length < 3 || req.body.text.length > 500) {
            errorObject.text = 'length';
        }
        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        req.validated = {};
        req.validated.text = req.body.text;

        next();
    } catch (error) {
        console.error(error);
        errorHandlers.dataValidationErrorHandler(res, error);
    }
};

exports.postPost = (req, res, next) => {
    try {
        let errorObject = {};
        // Missing parameters
        if (!req.body.categorySlug) {
            errorObject.categorySlug = 'missing'
        };
        if (!req.body.title) {
            errorObject.title = 'missing'
        };
        if (!req.file) {
            errorObject.image = 'missing'
        };

        // Filetype error
        if (req.file && (
                !req.file.filename.endsWith('.jpg') &&
                !req.file.filename.endsWith('.jpeg') &&
                !req.file.filename.endsWith('.gif') &&
                !req.file.filename.endsWith('.png'))) {
            errorObject.image = 'filetype'
        }
        // categorySlug error
        if (req.body.categorySlug && (req.body.categorySlug.length < 2 || req.body.categorySlug.length > 15)) {
            errorObject.categorySlug = 'length'
        }

        // Title error
        if (req.body.title && (req.body.title.length < 3 || req.body.title.length > 100)) {
            errorObject.categorySlug = 'length'
        }
        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        req.validated = {};
        req.validated.categorySlug = req.body.categorySlug;
        req.validated.title = req.body.title;
        next();

    } catch (error) {
        console.error(error);
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
};

exports.updatePost = (req, res, next) => {
    try {
        let errorObject = {};
        req.validated = {};
        // Filetype error
        if (req.file && (
                !req.file.filename.endsWith('.jpg') &&
                !req.file.filename.endsWith('.jpeg') &&
                !req.file.filename.endsWith('.gif') &&
                !req.file.filename.endsWith('.png'))) {
            errorObject.image = 'filetype'
        }

        // Title error
        if (req.body.title && (req.body.title.length < 3 || req.body.title.length > 100)) {
            errorObject.categorySlug = 'length'
        } else if (req.body.title) {
            req.validated.title = req.body.title;
        }
        if (req.body.is_hot !== undefined && req.body.is_hot !== null) {
            if (typeof req.body.is_hot !== 'boolean') {
                errorObject.is_hot = 'type';
            } else {
                req.validated.is_hot = req.body.is_hot;
            }
        }

        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        next();

    } catch (error) {
        console.error(error);
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
};

exports.like = (req, res, next) => {
    try {
        let errorObject = {};
        if (req.body.like_status === undefined || req.body.like_status === null) {
            errorObject.like_status = 'missing';
        }
        if (Number(req.body.like_status) === NaN || Number(req.body.like_status) < -1 || Number(req.body.like_status) > 1) {
            errorObject.like_status = 'range';
        }

        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        req.validated = {};
        req.validated.like_status = req.body.like_status;

        next();
    } catch (error) {
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
}

exports.userSignup = (req, res, next) => {
    try {
        let errorObject = {};
        if (!req.body.email) {
            errorObject.email = 'missing';
        } else if (!validator.isEmail(req.body.email)) {
            errorObject.email = 'type'
        } else if (req.body.email.length > 100 || req.body.email.length < 5) {
            errorObject.email = 'length'
        }

        if (!req.body.password) {
            errorObject.password = 'missing';
        } else if (typeof req.body.password !== 'string') {
            errorObject.password = 'type'
        }

        if (!req.body.nickname) {
            errorObject.nickname = 'missing';
        } else if (req.body.nickname.length > 40 || req.body.nickname.length < 3) {
            errorObject.nickname = 'length';
        }

        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        req.validated = {};
        req.validated.password = req.body.password;
        req.validated.email = req.body.email;
        req.validated.nickname = req.body.nickname;

        next();
    } catch (error) {
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
}

exports.userLogin = (req, res, next) => {
    try {
        let errorObject = {};
        if (!req.body.email) {
            errorObject.email = 'missing';
        } else if (!validator.isEmail(req.body.email)) {
            errorObject.email = 'type'
        } else if (req.body.email.length > 100 || req.body.email.length < 5) {
            errorObject.email = 'length'
        }


        if (!req.body.password) {
            errorObject.password = 'missing';
        } else if (typeof req.body.password !== 'string') {
            errorObject.password = 'type'
        }

        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        req.validated = {};
        req.validated.password = req.body.password;
        req.validated.email = req.body.email;

        next();
    } catch (error) {
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
}

exports.userUpdate = (req, res, next) => {
    try {
        let errorObject = {};
        req.validated = {};
        if (req.body.password){
            if(!(typeof req.body.password === 'string')){
                errorObject.password = 'type';
            }
            else{
                req.validated.password = req.body.password;
            }
        }
        if (req.body.nickname){
            if(!(typeof req.body.password === 'string')){
                errorObject.password = 'type';
            }
            else if (req.body.nickname.length > 40 || req.body.nickname.length < 3){
                errorObject.password = 'length';
            }
            else{
                req.validated.password = req.body.password;
            }
        }
        if (req.body.email){
            if (!validator.isEmail(req.body.email)) {
                errorObject.email = 'type'
            } else if (req.body.email.length > 100 || req.body.email.length < 5) {
                errorObject.email = 'length'
            }
            else{
                req.validated.email = req.body.email;
            }
        }

        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        next();
    } catch (error) {
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
};

exports.userDelete = (req, res, next) => {
    try {
        let errorObject = {};
        req.validated = {};
        if (req.body.password){
            if(!(typeof req.body.password === 'string')){
                errorObject.password = 'type';
            }
            else{
                req.validated.password = req.body.password;
            }
        }
        if (Object.keys(errorObject).length > 0) {
            throw errorObject;
        }

        next();
    } catch (error) {
        errorHandlers.dataValidationErrorHandler(res, error);
        errorHandlers.multerUndo(req);
    }
};