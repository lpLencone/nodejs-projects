const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/mainController')

router.get('/dashboard', dashboard)
router.post('/login', login)

module.exports = router
