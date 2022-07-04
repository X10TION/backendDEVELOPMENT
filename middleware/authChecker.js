const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/users')


const protect = asyncHandler(async (req, res, next) =>{
    let Token
    if(req.headers.authorization || req.headers.authorization.startsWith('Bearer')){
        try{
            // get token from the header
            Token =req.headers.authorization
            // .split(' ')[1]
            // varify the token
            const decoded = jwt.verify(Token,"nhgjffjgyfuyyugyufhfd")
            // get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.log(error)
            res.status(401).json({
                error: "user not authorized"
            })
        }
    }
    if(!Token){
        res.status(401).json({
            msg: "Not Authorized"
        })
    }
})
module.exports = { protect}