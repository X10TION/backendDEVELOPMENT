const express = require('express')
const router = express.Router()
const { login, register, home } = require('../controllers/auth')
const { protect } = require('../middleware/authChecker')


// router.post('/login', login)
router.post('/register', register)
router.post('/login', login)
router.get('/home', protect, home)

module.exports = router