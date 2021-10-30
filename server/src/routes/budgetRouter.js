'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/index')
const { budgetController } = require('../controllers/index')

router.get('/getBudgetBreakdown', middleware.authenticateUser, budgetController.getBudgetBreakdown);

module.exports = router;