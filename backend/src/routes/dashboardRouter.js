const express = require('express')
const router = express.Router()
const { dashboardController } = require('../controllers')

router.get('/getDashboardContent', dashboardController.getDashboardContentController)
router.post('/createBillingDetails', dashboardController.createAccountController)
router.delete('/deleteBillingDetails', dashboardController.deleteAccountController)
router.put('/updateBillingDetails', dashboardController.updateAccountController)

module.exports = router;