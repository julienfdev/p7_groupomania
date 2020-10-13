const {
    post
} = require("../app");

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

const formatComments = async (rawComments) => {
    let comments = [];
    for (comment of rawComments) {
        comments.unshift(await formatComment(comment));
    }
    return new Promise((resolve, reject) => {
        resolve(comments);
    });
}
const formatComment = async (rawComment) => {
    const commentEntry = {
        slug: rawComment.slug,
        text: rawComment.text,
        postSlug: (await rawComment.getPost()).slug,
        userSlug: (await rawComment.getUser()).slug
    }
    return new Promise((resolve, reject) => {
        resolve(commentEntry)
    });
}

module.exports.formatPosts = formatPosts;
module.exports.formatPost = formatPost;
module.exports.formatComments = formatComments;
module.exports.formatComment = formatComment;