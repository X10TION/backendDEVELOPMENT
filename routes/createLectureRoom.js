const express = require('express')
const router = express.Router()
const { createLecture, viewsLecture, joinLecture, updateLecture, removeLecture } = require('../controllers/lecture')
const { protect } = require('../middleware/authChecker')


router.post('/LectureRoom', protect,createLecture)
router.get('/LectureRoom', protect, viewsLecture)
router.post('/LectureRoom/:lectureroom',protect, joinLecture)
router.put('/LectureRoom/:lectureroom', protect,updateLecture)
router.delete('/LectureRoom/:lectureroom', protect, removeLecture)

module.exports = router