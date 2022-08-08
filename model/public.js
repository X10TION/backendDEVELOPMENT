const mongoose = require('mongoose')
const Schema = mongoose.Schema


const publicSchema = new Schema({
    title: String,
    department: String,
    school: String,
    description: String,
    attach:String,
    createdBy:String
},{
    timestamps: true
})
module.exports = mongoose.model('public', publicSchema)