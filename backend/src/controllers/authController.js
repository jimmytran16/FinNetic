const AuthService = require('../services/authService')
const authService = new AuthService();

const registerController = (req, res, next) => {
    authService.registerUser(req.body , (err, result) => {
        return res.json({
            data: err ? err : result,
            success: err ? false : true
        })
    })
}

const logInController = (req, res, next) => {
    authService.loginUser(req.body.username, req.body.password, (err,result) => {
      console.log(err)
        return res.json({
            data: err ? err.toString() : result,
            success: err ? false: true
        })
    })
}

const logOutController = (req, res, next) => {
    return res.json({
        data: 'logOut route',
        success:true
    })
}

const changePasswordController = (req, res, next) => {
    return res.json({
        data: 'changePassword route',
        success:true
    })
}

module.exports = {
    registerController,
    logInController,
    logOutController,
    changePasswordController
};
