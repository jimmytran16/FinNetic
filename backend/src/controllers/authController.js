const registerController = (req, res, next) => {
    return res.json({
        message: 'register route',
        success:true
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