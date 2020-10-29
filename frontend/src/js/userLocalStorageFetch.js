// Tries to recover the currentUser into the localStorage
export default () => {
    try {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            throw new Error;
        } else {
            return JSON.parse(currentUser);
        }
    } catch (error) {
        return undefined;
    }
}