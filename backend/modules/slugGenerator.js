const slug = require('slug');

// Creates a 15 char "slug", 10 first chars of the field provided + 5 last digits of Unix Epoch
const slugGenerator = (field) =>{
    const timeStamp = String(Date.now()).slice(-5);
    const crop = slug(field.slice(0, 10));

    return (crop + timeStamp);
}

module.exports = slugGenerator;