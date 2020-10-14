export default () => {
    try {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            throw new Error;
        } else {
            return currentUser;
        }
    } catch (error) {
        return undefined;
    }
}