const debug = (req, res, next) =>{
    if(req.file || req.files){
        req.body = JSON.parse(req.body);
    }
    res.status(200).json(req.body);
};

module.exports = debug;