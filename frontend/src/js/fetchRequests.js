import store from '../store/index';
import config from './config'

export const getPosts = async (category, page) => {
    try {
        const authorizationHeader = store.getters.authorizationHeader;
        const apiCall = store.getters.apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/${category}/${(page)? page : ''}`;
    
        const fetchResponse = await fetch(apiCall, {
            headers: {
                'Authorization': authorizationHeader
            }
        })
        return fetchResponse.json();
    } catch (error) {
        // Faire de la gestion d'erreurs
        console.error(error);
    }
}