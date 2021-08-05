const AuthService = require('../services/authService')
const authService = new AuthService();

const registerController = (req, res, next) => {
    authService.registerUser(req.body , (err, result) => {
        return res.json({
            message: err ? err : result,
            success: err ? false : true
        })
    })
}

const logInController = (req, res, next) => {
    return res.json({
        message: 'logIn route',
        success:true
    })
}

const logOutController = (req, res, next) => {
    return res.json({
        message: 'logOut route',
        success:true
    })
}

const changePasswordController = (req, res, next) => {
    return res.json({
        message: 'changePassword route',
        success:true
    })
}

module.exports = { registerController, logInController, logOutController, changePasswordController };