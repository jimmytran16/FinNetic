const AccountService = require('../services/accountService')
var accountService = new AccountService()   

const getDashboardContentController = (req, res, next) => {
    // get mock data for grid
    const data = require('./mockdata')

    return res.json({
        data: data,
        success:true
    })
}

const createAccountController = (req, res, next) => {
    accountService.createAccount('test',12,'jimmy tran', (err, data) => {
        return res.json({
            success: err ? false : true,
            data: data
        })
    });
}

const updateAccountController = (req, res, next) => {
    accountService.updateAccount(req.body.filter, req.body.update, (err, data) => {
        return res.json({
            success: result ? true : false,
            data: data
        })
    });
}

const deleteAccountController = (req, res, next) => {
    accountService.deleteAccount(req.body.id, (err, data) => {
        return res.json({
            success: result ? true : false,
            data: data
        })
    });
}

module.exports = { 
    getDashboardContentController, 
    createAccountController, 
    deleteAccountController,
    updateAccountController
};