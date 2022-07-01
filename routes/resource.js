const express = require('express')
const router = express.Router()
const { create, views, view, update, remove } = require('../controllers/resources')
// const upload = require('../middleware/uploads')
const { protect } = require('../middleware/authChecker')


router.post('/resources', protect, create)
router.get('/resources', protect, views)
router.get('/resources/:slug', protect, view)
router.put('/resources/:slug', protect, update)
router.delete('/resources/:slug',protect, remove)
module.exports = router
// upload.single('attach'),