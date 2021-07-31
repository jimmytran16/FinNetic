const express = require('express')
const router = express.Router()
const { dashboardController } = require('../controllers')

router.get('/getDashboardContent', dashboardController.getDashboardContentController)
router.get('/getUserAccounts', dashboardController.getUserAccountsController)
router.get('/getUserPayments', dashboardController.getUserPaymentsController)
router.post('/createBillingDetails', dashboardController.createAccountController)
router.delete('/deleteBillingDetails', dashboardController.deleteAccountController)
router.put('/updateBillingDetails', dashboardController.updateAccountController)

module.exports = router;