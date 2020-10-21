import store from '../store/index';
import config from './config'

export const getPosts = async (category, page) => {
    try {
        const authorizationHeader = store.getters.authorizationHeader;
        const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/${category}/${(page)? page : ''}`;

        const fetchResponse = await fetch(apiCall, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            }
        })
        return fetchResponse.json();
    } catch (error) {
        // Faire de la gestion d'erreurs
        console.error(error);
    }
};

export const getCategoriesPosts = async (category, page) =>{
    try {
        const authorizationHeader = store.getters.authorizationHeader;
        const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/category/${category}/${(page)? page : ''}`;

        const fetchResponse = await fetch(apiCall, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            }
        })
        return fetchResponse.json();
    } catch (error) {
        // Faire de la gestion d'erreurs
        console.error(error);
    }
}

export const getPost = async (slug) => {
    try {
        const authorizationHeader = store.getters.authorizationHeader;
        const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/${slug}`;

        const fetchResponse = await fetch(apiCall, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            }
        })
        return fetchResponse.json();
    } catch (error) {
        // Faire de la gestion d'erreurs
        console.error(error);
    }
}

export const likePost = async (slug, user, status) => {
    const authorizationHeader = store.getters.authorizationHeader;
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/${slug}/like`;
    const fetchResponse = await fetch(apiCall, {
        method: 'POST',
        headers: {
            'Authorization': authorizationHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userSlug: user,
            like_status: status
        })
    });
    if (fetchResponse.status === 200) {
        return true;
    } else {
        return false;
    }
};

export const deletePost = async (slug, user) => {
    const authorizationHeader = store.getters.authorizationHeader;
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/${slug}`;
    const fetchResponse = await fetch(apiCall, {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userSlug: user,
        })
    });
    if (fetchResponse.status === 200) {
        return true;
    } else {
        return false;
    }
};

export const getCategories = async () => {
    try {
        const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/category`;
        const authorizationHeader = store.getters.authorizationHeader;
        const fetchResponse = await fetch(apiCall, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            }
        })
        return fetchResponse.json();
    } catch (error) {
        // Faire de la gestion d'erreurs
        console.error(error);
    }
};

export const postPost = async (postObject, image, user) => {

    const authorizationHeader = store.getters.authorizationHeader;
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/`;
    const formPost = new FormData();
    const post = {
        ...postObject,
        userSlug: user
    };
    formPost.append('post', JSON.stringify(post));
    formPost.append('image', image);

    const fetchResponse = await fetch(apiCall, {
        method: 'POST',
        headers: {
            'Authorization': authorizationHeader
        },
        body: formPost
    })

    if (fetchResponse.status === 201) {
        return true;
    } else {
        return false;
    }
}

export const updatePost = async (postObject, image, user) => {
   try {
    const authorizationHeader = store.getters.authorizationHeader;
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/${postObject.slug}`;
    delete postObject.slug;
    if (!image) {
        const fetchResponse = await fetch(apiCall, {
            method: 'PUT',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...postObject,
                userSlug: user.slug
            })
        });
        if (fetchResponse.status === 200) {
            const response = await fetchResponse.json();
            return response.postSlug;
        } else {
            return false;
        }
    }
   } catch (error) {
       console.error(error);
   }
}

export const deleteComment = async (comment, user) => {
    const authorizationHeader = store.getters.authorizationHeader;
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/comments/${comment.slug}`;
    const fetchResponse = await fetch(apiCall, {
        method: 'DELETE',
        headers: {
            'Authorization': authorizationHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userSlug: user.slug,
        })
    });
    if (fetchResponse.status === 200) {
        return true;
    } else {
        return false;
    }
}
export const updateComment = async (comment, user) => {
    const authorizationHeader = store.getters.authorizationHeader;
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/comments/${comment.slug}`;
    const fetchResponse = await fetch(apiCall, {
        method: 'PUT',
        headers: {
            'Authorization': authorizationHeader,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userSlug: user.slug,
            text: comment.text
        })
    });
    if (fetchResponse.status === 200) {
        const response = await fetchResponse.json();
        return response.commentSlug;
    } else {
        return false;
    }
}