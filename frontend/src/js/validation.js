export const validatePost = (form) => {
    const title = form.querySelector('#addPostTitle').value;
    const image = form.querySelector('#fileSelector').files;

    const titleValid = (title.length > 4 & title.length <= 100);
    const imageValid = image.length;

    if(titleValid && imageValid){
        return true;
    }
    else{
        let errorObject = {}
        errorObject.title = Boolean(titleValid);
        errorObject.image = Boolean(imageValid);
        return errorObject;
    }
};