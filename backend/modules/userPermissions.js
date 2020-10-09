exports.isSelfOrAdmin = (loggedUser, slug) => {
    return (loggedUser.slug === slug || loggedUser.isAdmin);
}

exports.isSelf = (loggedUser, slug) => {
    return (loggedUser.slug === slug);
}

exports.isAdmin = (loggedUser, slug) => {
    return (loggedUser.isAdmin);
}