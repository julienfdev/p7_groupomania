import config from './config';
import router from '../router/index';

export default async (object) => {
    try {
        const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}`
        const loginObject = {
            email: object.email,
            password: object.password
        }

        const response = await fetch(`${apiCall}/user/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginObject)
        });

        // If user auth
        if (response.status === 200) {
            // Create the login object into the localStorage and pushing hot page
            localStorage.setItem('currentUser', JSON.stringify(await response.json()));
            router.push('/');
        } else if (response.status === 404) {
            throw {customMessage: 'L\'utilisateur n\'existe pas'} 
        } else if (response.status === 401) {
            throw {customMessage: 'Mot de passe incorrect'} 
        } else if (response.status === 400){
            const responseObject = await response.json();
            if(responseObject.errorObject.password === 'missing'){
                throw {customMessage: 'Mot de passe manquant'}
            }
            else{
                throw new Error;
            }
        }
    } catch (error) {
        if (error.customMessage) {
            return error.customMessage;
        }
        else{
            return 'Erreur serveur'
        }
    }

}