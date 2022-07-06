const express = require('express')
const router = express.Router()
const { login, register, profile } = require('../controllers/auth')
const { protect } = require('../middleware/authChecker')


// router.post('/login', login)
router.post('/register', register)
router.post('/login', login)
router.get('/home', protect, profile)

module.exports = router