const formatPosts = (rawPosts) => {
    let posts = [];
    for (post of rawPosts) {
        posts.unshift(formatPost(post));
    }
    return posts;
}

const formatPost = (rawPost) => {
    const postEntry = {
        slug: rawPost.slug,
        likes: rawPost.likes,
        image_url: rawPost.image_url,
        title: rawPost.title,
        is_hot: rawPost.is_hot,
        createdAt: rawPost.createdAt,
        categorySlug: rawPost.Category.slug
    }
    return postEntry;
}

module.exports.formatPosts = formatPosts;
module.exports.formatPost = formatPost;