'use strict'
const { DashboardUtil } = require('../utils/index')
const AccountService = require('../services/accountService')
const PaymentService = require('../services/paymentService')
var accountService = new AccountService()
var paymentService = new PaymentService()

// Metric controllers
const getDashboardContentController = (req, res, next) => {
  paymentService.getChartDataByUser(req.user.userId, (err, result) => {
    return res.json({
      data: err ? err :
        {
          averageChart: result.averageChart,
          default: result.defaultChart,
          remainingPayments: result.remainingChart,
          isDefaultData : result.isDefaultData,
          isAverageData : result.isAverageData,
          isRemainingData : result.isRemainingData
        },
      success: err ? false : true
    })
  })
}

// Accounts controllers
const getUserAccountsController = (req, res, next) => {
  accountService.getAllAccounts(req.user.userId, (err, data) => {
    return res.json({
      data: err ? err : data,
      success: err ? false : true
    })
  })
}

const createAccountController = (req, res, next) => {
  accountService.createAccount(req.body.name, req.body.balance, req.body.accountHolder, req.body.accountDueDay, req.user.userId, (err, data) => {
    return res.json({
      success: err ? false : true,
      data: data
    })
  });
}

const updateAccountController = (req, res, next) => {
  const { filter, update } = req.body;
  if (!filter || !update)
    return res.json({ success: false, data: 'filter, update params required!' });

  accountService.updateAccount(req.body.filter, { $set: req.body.update }, (err, data) => {
    return res.json({
      success: data ? true : false,
      data: data
    })
  });
}

const deleteAccountController = (req, res, next) => {
  const { id } = req.body;
  if (!id) return res.json({ success: false, data: 'id params required!' });

  accountService.deleteAccount(req.body.id, (err, data) => {
    return res.json({
      success: data ? true : false,
      data: data
    })
  });
}

// Payment controllers
const getUserPaymentsController = (req, res, next) => {
  paymentService.getAllPaymentsAndAggregateByMonth(req.user.userId, (err, data) => {
    return res.json({
      success: err ? false : true,
      data: err ? err : data
    })
  });
}

const createPaymentController = (req, res, next) => {
  const { name, accountId, accountName, amountPaid, paymentDate } = req.body;
  if (!name || !accountId || !accountName || !amountPaid || !paymentDate)
    return res.json({ success: false, data: 'userId, name, accoundId, accountName, amountPaid, paymentDate params required!' });

  paymentService.createPayment(req.user.userId, req.body.name, req.body.accountId, req.body.accountName, req.body.amountPaid, req.body.paymentDate, (err, data) => {
    return res.json({
      success: err ? false : true,
      data: err ? err : data
    })
  });
}

const deletePaymentController = (req, res, next) => {
  paymentService.deletePaymentById(req.body.id, (err, data) => {
    return res.json({
      success: err ? false : true,
      data: err ? err : data
    })
  });
}

module.exports = {
  getDashboardContentController,
  createAccountController,
  deleteAccountController,
  updateAccountController,
  getUserAccountsController,
  getUserPaymentsController,
  createPaymentController,
  deletePaymentController,
};
