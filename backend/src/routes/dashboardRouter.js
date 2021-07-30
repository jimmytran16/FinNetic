const express = require('express')
const router = express.Router()
const { dashboardController } = require('../controllers')

router.get('/getDashboardContent', dashboardController.getDashboardContentController)
router.post('/createBillingDetails', dashboardController.postBillingDetailsController)

module.exports = router;