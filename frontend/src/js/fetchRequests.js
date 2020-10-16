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