// ███████╗██████╗ ██████╗  ██████╗ ██████╗     ██╗  ██╗ █████╗ ███╗   ██╗██████╗ ██╗     ███████╗██████╗ ███████╗
// ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    ██║  ██║██╔══██╗████╗  ██║██╔══██╗██║     ██╔════╝██╔══██╗██╔════╝
// █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝    ███████║███████║██╔██╗ ██║██║  ██║██║     █████╗  ██████╔╝███████╗
// ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗    ██╔══██║██╔══██║██║╚██╗██║██║  ██║██║     ██╔══╝  ██╔══██╗╚════██║
// ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║    ██║  ██║██║  ██║██║ ╚████║██████╔╝███████╗███████╗██║  ██║███████║
// ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
//                                                                                                                
// Error handlers respond to requests according to error type

const fs = require('fs');

// Sequelize has custom error handling, failed requests have a path (ex: email or User.email) and a validatorKey (ex: not_unique)
const sqlErrorHandler = (res, err) => {
    let errorList = []
    // We push each error into errorList object, with the related field and type
    for (error of err) {
        console.log(error);
        errorList.push({
            field: error.path,
            fail: error.validatorKey
        })
    }
    res.status(400).json({
        errorList
    });
};

exports.dataValidationErrorHandler = (res, errorObject) => {
    res.status(400).json({
        message: 'Data validation error',
        errorObject
    })
}

const genericErrorHandler = (res, err) => {
    res.status(500).json({
        error: 'Something went wrong'
    });
}

const customErrorHandler = (res, err) => {
    res.status(err.status).json({
        error: err.message
    });
}

exports.basicHandler = (res, error) => {
    if (error.status) {
        customErrorHandler(res, error);
    } else if (error.errors) {
        sqlErrorHandler(res, error.errors);
    } else {
        genericErrorHandler(res, error);
    }
}

exports.multerUndo = (req) =>{
    if(req.file){
        fs.unlink(req.file.path, ()=>{
            console.log('unlinked');
        });
    }
};