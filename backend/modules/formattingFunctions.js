const formatPosts = async (rawPosts, user) => {
    let posts = [];
    for (post of rawPosts) {
        posts.unshift(await formatPost(post, user));
    }
    return posts;
}

const formatPost = async (rawPost, user) => {
    const originalPoster = await rawPost.getUser();
    const likedByUser = (await rawPost.getLikes({
        attributes: ['like_status'],
        where: {
            user_id: user.id
        }
    }));
    let liked = false;

    if (likedByUser.length) {
        switch (likedByUser[0].like_status) {
            case 1:
                liked = true;
                break;
            case -1:
                liked = false;
                break;
        }
    }

    const postEntry = {
        slug: rawPost.slug,
        likes: rawPost.likes,
        image_url: rawPost.image_url,
        title: rawPost.title,
        is_hot: rawPost.is_hot,
        createdAt: rawPost.createdAt,
        categorySlug: rawPost.Category.slug,
        userSlug: originalPoster.slug,
        userName: originalPoster.nickname,
        likedByCurrentUser: ((likedByUser.length) ? true : false),
        liked: liked
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
        userSlug: (await rawComment.getUser()).slug,
        userName: (await rawComment.getUser()).nickname
    }
    return new Promise((resolve, reject) => {
        resolve(commentEntry)
    });
}

module.exports.formatPosts = formatPosts;
module.exports.formatPost = formatPost;
module.exports.formatComments = formatComments;
module.exports.formatComment = formatComment;