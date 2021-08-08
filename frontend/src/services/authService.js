// Class used to authenticate and keep track of if the user is authenticated or not
class AuthService {

    authenticateUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    getTokenFromStore() {
        return JSON.parse(localStorage.getItem('user'))?.accessToken || null;
    }

    isAuthenticated() {
        return JSON.parse(localStorage.getItem('user'))?.isAuth || false
    }

    logout() {
        delete localStorage['user']
    }
}
// Export an instance of this class
export default new AuthService();