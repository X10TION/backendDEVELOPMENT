const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema({
    reg:{
        type:String,
        min:10,
        max:30,
        unique: true,
        require: [true, 'please provide you student registration id']
    },
    department:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)