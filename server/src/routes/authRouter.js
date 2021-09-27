const express = require('express')
const router = express.Router()
const { authController } = require('../controllers')

router.post('/changePassword', authController.changePasswordController)
router.post('/login', authController.logInController)
router.post('/register', authController.registerController)

module.exports = router;