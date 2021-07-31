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

const getUserAccountsController = (req, res, next) => {
    // mock data for tables
    const data = [
        { name: 'Jimmy Tran', accountName: 'Macy', balance: 12, lastPayment:'07/28/2021' },
        { name: 'Johnny Tran', accountName: 'Discover', balance: 31, lastPayment:'07/08/2021' },
        { name: 'Jacky Tran', accountName: 'Macy', balance: 122, lastPayment:'07/30/2021' },
        { name: 'Jenny Tran', accountName: 'Macy', balance: 123, lastPayment:'07/31/2021' }
    ]

    return res.json({
        data: data,
        success:true
    })
}

const getUserPaymentsController = (req, res, next) => {
    // mock data for tables
    const data = [
        { name: 'Jimmy Tran', accountName: 'Macy', amountPaid: 30, paymentDate:'10/28/2021' },
        { name: 'Johnny Tran', accountName: 'Discover', amountPaid: 31, paymentDate:'10/08/2021' },
        { name: 'Jacky Tran', accountName: 'Macy', amountPaid: 30, paymentDate:'10/30/2021' },
        { name: 'Jenny Tran', accountName: 'Macy', amountPaid: 30, paymentDate:'10/31/2021' }
    ]

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
    updateAccountController,
    getUserAccountsController,
    getUserPaymentsController
};