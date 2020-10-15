import store from '../store/index';
import config from './config'

export const getHotPosts = async () => {
    try {
        const authorizationHeader = store.getters.authorizationHeader;
        console.log(authorizationHeader);
        const apiCall = store.getters.apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}/post/hot`;
    
        const fetchResponse = await fetch(apiCall, {
            headers: {
                'Authorization': authorizationHeader
            }
        })
        console.log(await fetchResponse.json());
    } catch (error) {
        // Faire de la gestion d'erreurs
        console.error(error);
    }
}