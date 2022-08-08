const express = require('express')
const path = require('path')
const multer = require('multer')

var filestorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./uploads')
    },
    filename:(req,file, cb) => {
        cb(null,"[mauces]-" + Date.now() + file.originalname)
    }
})

var upload = multer({
    storage:filestorageEngine
})

module.exports = upload

