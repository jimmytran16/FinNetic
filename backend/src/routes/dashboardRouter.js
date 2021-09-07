const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/index')
const { dashboardController } = require('../controllers')

router.get('/getDashboardContent', middlewares.authenticateUser, dashboardController.getDashboardContentController)
router.get('/getUserAccounts', middlewares.authenticateUser, dashboardController.getUserAccountsController)
router.get('/getUserPayments', middlewares.authenticateUser, dashboardController.getUserPaymentsController)
router.post('/createBillingDetails', middlewares.authenticateUser, dashboardController.createAccountController)
router.delete('/deleteBillingDetails', middlewares.authenticateUser, dashboardController.deleteAccountController)
router.put('/updateAccount', middlewares.authenticateUser, dashboardController.updateAccountController)

router.get('/getUserPayments', middlewares.authenticateUser, dashboardController.getUserPaymentsController)
router.post('/createUserPayment', middlewares.authenticateUser, dashboardController.createPaymentController)
router.delete('/deletePayment', middlewares.authenticateUser, dashboardController.deletePaymentController)

module.exports = router;