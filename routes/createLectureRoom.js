const express = require('express')
const router = express.Router()
const { createLecture, viewsLecture, joinLecture, updateLecture, removeLecture } = require('../controllers/lecture')
const { protect } = require('../middleware/authChecker')


router.post('/LectureRoom', protect,createLecture)
router.get('/LectureRoom', protect, viewsLecture)
router.post('/LectureRoom/:slug',protect, joinLecture)
router.put('/LectureRoom/:slug', protect,updateLecture)
router.delete('/LectureRoom/:slug', protect, removeLecture)

module.exports = router