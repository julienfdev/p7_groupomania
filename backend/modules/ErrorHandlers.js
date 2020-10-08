
exports.sqlErrorHandler = (res, err) =>{
    let errorList = []
    for(error of err){
        console.log(error);
        errorList.push({
            field: error.path,
            fail: error.validatorKey
        })
    }
    res.status(400).json({errorList});
};

exports.dataValidationErrorHandler = (res, err) =>{

}

exports.genericErrorHandler = (res, err) =>{
    console.log({error: err.message});
    res.status(500).json({error: 'Something went wrong'});
}

exports.customErrorHandler = (res, err) =>{
    res.status(err.status).json({error: err.message});
}