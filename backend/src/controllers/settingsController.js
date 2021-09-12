const UserService = require('../services/userService')
const ReminderService = require('../services/reminderService')
const userService = new UserService();
const reminderService = new ReminderService();

const getUserController = (req, res, next) => {
    userService.getUser(req.user.userId, (err, result) => {
        return res.json({
            success: err ? false : true,
            data: err ? err : result
        })
    })
}

const getAccountsController = (req, res, next) => {
    reminderService.getAllAccounts(req.user.userId, (err, result) => {
        return res.json({
            success: err ? false : true,
            data: err ? err : result
        })
    })
}

module.exports = {
    getUserController,
    getAccountsController
}