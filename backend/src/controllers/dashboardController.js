const AccountService = require('../services/accountService')

const getDashboardContentController = (req, res, next) => {
    // get mock data for grid
    const data = require('./mockdata')

    return res.json({
        data: data,
        message: 'getDashboardContentController route',
        success:true
    })
}

const postBillingDetailsController = (req, res, next) => {
    var accountService = new AccountService()   
    accountService.createAccount('test',12,'jimmy tran', (err, result) => {
        return res.json({
            success: err ? false : true,
            message: result
        })
    });
}

module.exports = { getDashboardContentController,postBillingDetailsController };