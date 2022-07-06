const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/users')
/*
we are goin to create registration system using JWT 
@desc regisstration page
@route POST api/registration
@access public
*/
//  register route api/registration
exports.register = asyncHandler (async (req, res) => {
    const {reg, department, password, acounttype, email, fullname } = req.body
    console.log(req.body)
    if(!reg || !department || !password || !email || !acounttype){
        res.status(400).json({
            msg: "Please provide valid credential.."
        })
    }
    // check for user exist
    const userExist = await User.findOne({reg})
    if(userExist){
        res.status(400).json({error: "user already register with this Id"})
    }
    // hash password here
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    // create user 
    const user = await User.create({
        reg,
        department, 
        password:hashPassword, 
        email,
        acounttype,
        fullname
    })
    if(user){
        res.status(201).json({
            reg,
            email,
            department,
            acounttype,
            fullname           
        })
    }else{
        res.status(100).json({
            error: "Invalid User data"
        })
    }
})
// @desc login page
// @route POST  api/login
// @access public
//  register route api/registration
exports.login = asyncHandler (async (req, res) => {
   const {reg, password } = req.body
//    console.log(req.body)
// check for user reg
    const user = await User.findOne({reg})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id:user._id,
            reg: user.reg,
            email: user.email,
            department: user.department,
            acounttype:user.acounttype,
            fullname: user.fullname,
            token:generateToken(user._id)
        })
    }else{
        res.status(100).json({
            error: "Invalid login credentials"
        })
    }
})
// @desc HOME page
// @route GET  api/home
// @access private
//  register route api/home
exports.profile = asyncHandler (async (req, res) => {
   const { _id, reg, email, department, acounttype,fullname} = await User.findById(req.user.id)
   res.status(200).json({
    id:_id,
    reg,
    email,
    department,
    acounttype,
    fullname
   })
})
// create token generating functions
const generateToken = (id) =>{
    return jwt.sign({ id }, "nhgjffjgyfuyyugyufhfd",{
        expiresIn: '3d',
    })
} 