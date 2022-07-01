const mongoose = require('mongoose')
const { ObjectId} = mongoose.Schema

const resoureceSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        min: 7,
       
    },
    slug:{
        type: String,
        unique: true,
        min: 7,
        
    },
    description:{
        type:String
    },
    school:{
        type:String,
        min:3,
        max:100
    },
    department:{
        type:String,
        min:4,
    },
    category:{
        type:String,
    },
    attach:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    review:{
        name:{
            type:String,  
        },
        comment:{
            type: String
        }
    }
},{
    timestamps: true
})

module.exports = mongoose.model('resource', resoureceSchema)