const validator = require('validator');

const escapeRecursive = (json) => {
    for (key in json) {                                         // Pour chaque clé de la requete
        if (typeof json[key] === 'object') {                    // Si c'est un objet, récursivité
            escapeRecursive(json[key]);
        } else {                                                // Sinon, si c'est une string, on échappe les caractères HTML
            if (typeof json[key] === 'string') {
                json[key] = validator.escape(json[key]);
            }
        }
    }
}

const escapeHtml = (req, res, next) => {                        // Middleware d'escaping html de toute la req.body

    if (req.body) {
        escapeRecursive(req.body);                              // Appel d'une fonction récursive pour sanitize tout le corps de la requête
    }
    next();
};

module.exports = escapeHtml;