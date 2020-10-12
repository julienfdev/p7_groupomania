// If a file is uploaded, we parse the object post to the body to be readable by the next MWs

const formatter = (req, res, next) => {
    if(req.file){
        req.body = {
            ...JSON.parse(req.body.post)
        }
    }
    next();
};

module.exports = formatter;