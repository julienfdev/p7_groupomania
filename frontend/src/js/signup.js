import config from './config';
import login from './login';
//import router from '../router/index';
//import login from './login';

export default async (object) =>{
try {
    // VALIDATION
    if(!(object.password === object.passwordRepeat)){
        throw {customMessage: 'Les mots de passe sont différents'};
    }
    const apiCall = `${config.api.protocol}://${config.api.host}/api/${config.api.version}`;
    const response = await fetch(`${apiCall}/user/signup`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(object)
    });

    if(response.status === 201){
        // If we have succeded in creating the user, login with the same credentials
        login(object);
    }
    else if(response.status === 400){
        // error handling
        const responseObject = await response.json();
        switch(responseObject.errorList[0].fail){
            case 'not_unique':
                throw {customMessage: 'Le mail ou pseudo existe déjà'}
            default:
                throw new Error;
        }
    }

} catch (error) {
    if(error.customMessage){
        return error.customMessage;
    }
    else{
        console.log(error);
        return 'Erreur serveur';
    }
}
};