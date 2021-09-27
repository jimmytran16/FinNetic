// Class used to authenticate and keep track of if the user is authenticated or not
class AuthService {

    authenticateUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
        document.location.href = "/dashboard/open-accounts";
    }

    getTokenFromStore() {
        return JSON.parse(localStorage.getItem('user'))?.accessToken || null;
    }

    getUserEmailFromStore() {
        return JSON.parse(localStorage.getItem('user'))?.user || null
    }

    getUserNameFromStore() {
        return JSON.parse(localStorage.getItem('user'))?.name || null
    }

    isAuthenticated() {
        return JSON.parse(localStorage.getItem('user'))?.isAuth || false
    }

    logout() {
        delete localStorage['user']
        document.location.href = "/login";
    }
}
// Export an instance of this class
export default new AuthService();