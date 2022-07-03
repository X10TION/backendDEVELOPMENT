const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const resourcRoutes = require('./routes/resource')
const authRoutes = require('./routes/auth')
const createLectureRoom = require('./routes/createLectureRoom')
const cookieParser = require('cookie-parser')
// create application
const app = express()
// mongoose connnection here
mongoose.connect(process.env.DATABASE_URI)
.then(() =>  console.log("Database connected succefully "))
.catch(err => console.log(err))

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('./uploads', express.static('uploads'))
// importation of router line 7
app.use('/api',  resourcRoutes)
app.use('/api',  authRoutes)
app.use('/api', createLectureRoom)
// initializing port
const port = process.env.PORT || 4001
app.listen(port, () => console.log(`server connected...@ ${port}`))