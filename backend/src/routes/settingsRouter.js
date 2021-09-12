const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/index')
const { settingsController } = require('../controllers')

router.get('/getUser', middlewares.authenticateUser, settingsController.getUserController);
router.get('/getAccounts', middlewares.authenticateUser, settingsController.getAccountsController);

module.exports = router;