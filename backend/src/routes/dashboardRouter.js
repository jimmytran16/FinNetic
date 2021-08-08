const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/index')
const { dashboardController } = require('../controllers')

router.get('/getDashboardContent', middlewares.authenticateUser, dashboardController.getDashboardContentController)
router.get('/getUserAccounts', middlewares.authenticateUser, dashboardController.getUserAccountsController)
router.get('/getUserPayments', middlewares.authenticateUser, dashboardController.getUserPaymentsController)
router.post('/createBillingDetails', middlewares.authenticateUser, dashboardController.createAccountController)
router.delete('/deleteBillingDetails', middlewares.authenticateUser, dashboardController.deleteAccountController)
router.put('/updateBillingDetails', middlewares.authenticateUser, dashboardController.updateAccountController)

module.exports = router;