const slug = require('slug');

const slugGenerator = (field) =>{
    const timeStamp = String(Date.now()).slice(-5);
    const nick = slug(field.slice(0, 10));

    return (nick + timeStamp);
}

module.exports = slugGenerator;